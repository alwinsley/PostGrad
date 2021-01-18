import React, {useState, useEffect} from 'react';

import FusePageSimple from '@fuse/core/FusePageSimple';

import SponsorshipHeader from './component/SponsorshipHeader';
import SponsorshipContent from './component/SponsorshipContent';
import AlertDlg from 'app/components/AlertDlg';
import ImageDlg from 'app/components/ImageDlg';
import { getAllSponsorships, deleteSponsorship } from 'app/services/sponsorship_api';

const SponsorshipList = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	useEffect(() => {
		updatePageContent();
	}, []);

	const updatePageContent = () => {
		setLoading(true);

		getAllSponsorships().then(res => {
			let _sponsorships = res.data.sponsorships;

			setData(_sponsorships);
			
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	const handleChangeSponsorshipStatus = (sponsorshipId, type) => {
		if(type === 'edit') editSponsorship(sponsorshipId);
		else if(type === 'delete') setDeleteId(sponsorshipId);
	}

	const editSponsorship = (id) => {
		console.log(id);
	}

	const removeSponsorship = () => {
		let _data = [...data];
		let _sponsorship = _data.find(d => d.id === deleteId);
		
		setDeleteId(null);

		deleteSponsorship(_sponsorship.id).then(res => {
			let _index = _data.indexOf(_sponsorship);
			_data.splice(_index, 1);
			setData(_data);
		}).catch(err => {
			console.log(err);
		});
	}

	const handleCreatedSponsorship = (sponsorship) => {
		setOpenModal(false);
		updatePageContent();
	}

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full overflow-hidden',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72',
					wrapper: 'min-h-0'
				}}
				header={<SponsorshipHeader title="Sponsorship Ads" onCreateSponsorship={() => setOpenModal(true)}/>}
				content={<SponsorshipContent loading={loading} data={data} onChangeStatus={handleChangeSponsorshipStatus}/>}
				sidebarInner
				innerScroll
			/>
			
			<AlertDlg
				open={!!deleteId}
				type="warning"
				text="Are you sure to delete?"
				subtext="you can't recover it"
				confirmText="Yes, Delete"
				onClose={() => setDeleteId(null)}
				onConfirm={removeSponsorship}/>

			{openModal && 
				<ImageDlg open={openModal} title="Create New Sponsorship" onClose={() => setOpenModal(false)} onCreatedSponsorship={handleCreatedSponsorship}/>
			}
		</>
	);
}

export default SponsorshipList;
