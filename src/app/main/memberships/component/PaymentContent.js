import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	IconButton,
	Icon,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';

import FuseAnimate from '@fuse/core/FuseAnimate';

import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from 'app/services/config';
import clsx from 'clsx';

import { showMessage } from 'app/store/fuse/messageSlice';
import { postSubscription } from 'app/services/membership_api';


const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`
	},
	cardContainer: {
		width: "100%",
		maxWidth: '460px',
		margin: 'auto'
	},
	cardfield: {
		border: '1px solid #cecece',
		borderRadius: 5,
		padding: '5px 16px',
		minHeight: 52,
		marginBottom: 24
	},
	membership: {
		marginBottom: 24,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
}));

const PaymentContent = ({ membership, onChanged, onClose }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [stripe, setStripe] = useState(null);
	const [elements, setElements] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		initStripe();
	}, []);

	const initStripe = async () => {
		const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
		const elements = stripe.elements();

		var style = {
			base: {
			color: '#32325d',
			lineHeight: '40px',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
				'::placeholder': {
					color: '#aab7c4'
				}
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a'
			}
		};

		var cardNumberElement = elements.create('cardNumber', {
			style: style,
			showIcon: true,
			placeholder: 'Card Number',
		});
		cardNumberElement.mount('#card-number');

		var cardExpiryElement = elements.create('cardExpiry', {
			style: style,
			placeholder: 'Expire Date (02/21)',
		});
		cardExpiryElement.mount('#expire');

		var cardCvcElement = elements.create('cardCvc', {
			style: style,
			placeholder: 'CVC/CVV',
		});
		cardCvcElement.mount('#cvv');

		setStripe(stripe);
		setElements(elements);
	}

	const handleSubmit = () => {
		if(submitting || !elements) return;
		setSubmitting(true);

		const card = elements.getElement('cardNumber');
		stripe.createToken(card).then(res => {
			if (res.error) {
				dispatch(showMessage({variant: 'error', message: res.error.message }))
				setSubmitting(false);
			} else {
				handleSubscription(res.token);
			}
     	});
	}

	const handleSubscription = (token) => {
		
		postSubscription({token: token.id, membership: membership.id}).then(res => {
			dispatch(showMessage({variant: 'success', message: "subscription created successfully" }));
			onChanged(res.data.membership);
		}).catch(err => {
			dispatch(showMessage({variant: 'error', message: "subscription failed" }));
			setSubmitting(false);
		})
	}

	return (
		<div className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0 sm:p-64')}>
			<FuseAnimate animation={{ translateY: [0, '100%'] }} duration={600}>
				<Card className="mx-auto w-xl rounded-8">
					<CardHeader
						action={
							<IconButton aria-label="settings" onClick={onClose}>
								<Icon>close</Icon>
							</IconButton>
						}
					/>
					<CardContent className="p-24 py-56">
						<div className={classes.cardContainer}>
							<div className={classes.membership}>
								<Typography variant="h5">{membership.title}</Typography>
								<Typography variant="h6">${membership.price} / {membership.month === 1 ? 'month' : membership.month + ' months'}</Typography>
							</div>

							<div className={classes.cardfield}>
								<div id="card-number" label="Standard" ></div>
							</div>
							<div className={classes.cardfield}>
								<div id="expire" label="Standard" ></div>
							</div>
							<div className={classes.cardfield}>
								<div id="cvv" label="Standard" ></div>
							</div>

							<Button
								fullWidth
								color="primary"
								variant="contained"
								size="large"
								onClick={handleSubmit}
							>Subscribe</Button>
						</div>
					</CardContent>
					<div/>
				</Card>
			</FuseAnimate>
		</div>
	);
}

export default PaymentContent;
