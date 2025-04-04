import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleById } from '@slices/articleSlice';
import { formatTimestamp } from '@helper/stringAndDataHelpers';
import Loading from '@components/common/Loading';
import AnimateImage from '@components/common/AnimateImage';

const BlogDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { isArticleLoading, article } = useSelector(state => state.article);

	useEffect(() => {
		dispatch(getArticleById(id));
	}, [dispatch, id]);

	return (
		<div className="page_bg blog_detail">
			<div
				className={`container-fluid p-5 ${
					isArticleLoading ? 'loading_outerLayer' : ''
				}`}
			>
				{isArticleLoading && <Loading />}
				{article && (
					<div className="container text-light">
						<div className="card p-3">
							<div className="ms-2">
								<h5 className="h2 fw-bold">{article.title}</h5>
								<small className="text-secondary">
									{formatTimestamp(article.create_at)}
									<span className="ms-2">
										{article.author}
									</span>
									發佈
								</small>
							</div>

							<div className="">
								<div className="float-start mt-2 me-2">
									<AnimateImage
										src={article.image}
										alt={article.title}
										className="img-thumbnail m-2"
									/>
								</div>
								<div className="content">
									{article.description}
									{article.content}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BlogDetail;
