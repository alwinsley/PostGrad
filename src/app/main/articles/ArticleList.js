import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import FusePageSimple from '@fuse/core/FusePageSimple';

import ArticleHeader from './component/ArticleHeader';
import ArticleContent from './component/ArticleContent';
import AlertDlg from 'app/components/AlertDlg';
import NewsDlg from 'app/components/NewsDlg';
import { GetArticles, DeleteArticle } from 'app/services/article_api';

const ArticleList = () => {
	const me = useSelector(({ auth }) => auth.user);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	useEffect(() => {
		updatePageContent();
	}, [search]);

	const handleSearch = (search) => {
		setSearch(search);
	}

	const updatePageContent = () => {
		setLoading(true);

		GetArticles({search}).then(res => {
			let _articles = res.data.articles;

			setData(_articles);
			
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	const editArticle = (id) => {
		console.log(id);
	}

	const handleRemoveArticle = (data) => {

		DeleteArticle(data.id).then(res => {
			updatePageContent();
		}).catch(err => {
			console.log(err);
		});
	}

	const handleCreatedArticle = (article) => {
		setOpenModal(false);
		updatePageContent();
	}

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full overflow-auto',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72',
					wrapper: 'min-h-0'
				}}
				header={<ArticleHeader title="News" onChangeSearch={handleSearch} onCreateArticle={() => setOpenModal(true)}/>}
				content={<ArticleContent loading={loading} data={data} onDelete={handleRemoveArticle}/>}
				sidebarInner
				innerScroll
			/>
			
			{/* <AlertDlg
				open={!!deleteId}
				type="warning"
				text="Are you sure to delete?"
				subtext="you can't recover it"
				confirmText="Yes, Delete"
				onClose={() => setDeleteId(null)}
				onConfirm={removeArticle}/> */}

			{openModal && 
				<NewsDlg open={openModal} editable={true} onClose={() => setOpenModal(false)} onChanged={handleCreatedArticle}/>
			}
		</>
	);
}

export default ArticleList;
