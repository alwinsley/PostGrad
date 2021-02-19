import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import FusePageSimple from '@fuse/core/FusePageSimple';

import ArticleHeader from './component/ArticleHeader';
import ArticleContent from './component/ArticleContent';
import AlertDlg from 'app/components/AlertDlg';
import NewsDlg from 'app/components/Dialogs/NewsDlg';
import { GetArticles, DeleteArticle } from 'app/services/article_api';

const ArticleList = () => {
	const me = useSelector(({ auth }) => auth.user);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [selected, setSelected] = useState(null);

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

	const handleRemoveArticle = (article) => {
		setDeleteId(article.id)
	}

	const removeArticle = () => {
		DeleteArticle(deleteId).then(res => {
			setDeleteId(null);
			updatePageContent();
		}).catch(err => {
			console.log(err);
		});
	}

	const handleEditArticle = (article) => {
		setSelected(article);
		setOpenModal(true);
	}

	const handleSuccessAction = (article) => {
		setOpenModal(false);
		setSelected(null);
		updatePageContent();
	}

	const handleCloseModal = () => {
		setOpenModal(false);
		setSelected(null);
	}

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72',
					wrapper: 'min-h-0'
				}}
				header={<ArticleHeader title="News" onChangeSearch={handleSearch} onCreateArticle={() => setOpenModal(true)}/>}
				content={<ArticleContent loading={loading} data={data} onDelete={handleRemoveArticle} onEdit={handleEditArticle}/>}
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
				onConfirm={removeArticle}/>

			{openModal && 
				<NewsDlg
					open={openModal}
					data={selected}
					onClose={handleCloseModal}
					onChanged={handleSuccessAction}/>
			}
		</>
	);
}

export default ArticleList;
