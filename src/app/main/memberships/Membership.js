import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MembershipContent from './component/MembershipContent';
import PaymentContent from './component/PaymentContent';

import { setUser } from 'app/auth/store/userSlice';
import { getMemberships } from '../../services/membership_api';

const Membership = () => {
	const dispatch = useDispatch();
	const me = useSelector(({ auth }) => auth.user);
	const [current, setCurrent] = useState([]);
	const [selectedMembership, setSelectedMembership] = useState(null);
	const [memberships, setMemberships] = useState([]);

	useEffect(() => {
		if(me && me.memberships.length){
			let list = me.memberships.map(m => {return m.membership_id});
			setCurrent(list);
		}

		getMemberships().then(res => {
			setMemberships(res.data.memberships);
		})
	}, []);

	const handleSelectedItem = (item) => {
		setSelectedMembership(item);
	}

	const handleUpdatedMembership = (membership) => {
		setCurrent([membership]);
		let user = {...me, memberships: [{membership_id: membership}]};
		dispatch(setUser(user));

		setSelectedMembership(null);
	}

	return (
		<>
			{selectedMembership ? 
				<PaymentContent
					membership={selectedMembership}
					onChanged={handleUpdatedMembership}
					onClose={() => setSelectedMembership(null)}/>
				:
				<MembershipContent
					current={current}
					memberships={memberships}
					onSelectItem={handleSelectedItem}/>
			}
		</>
	);
}

export default Membership;
