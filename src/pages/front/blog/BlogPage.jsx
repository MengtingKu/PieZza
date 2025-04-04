import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle } from '@slices/articleSlice';
import { formatTimestamp } from '@helper/stringAndDataHelpers';
import Loading from '@components/common/Loading';

const BlogPage = () => {
	const dispatch = useDispatch();
	const { isArticleLoading, articles } = useSelector(state => state.article);

	useEffect(() => {
		dispatch(getArticle());
	}, [dispatch]);

	return (
		<div className="page_bg">
			<div
				className={`container mb-5 blog ${
					isArticleLoading ? 'loading_outerLayer' : ''
				}`}
			>
				{isArticleLoading && <Loading />}
				<div className="page_title">
					<h3>部落格</h3>
					<h6>Blog</h6>
				</div>
				<div className="row my-5">
					<div className="col-md-12 mb-3">
						<h4 className="session_title">
							<span>熱門內容 Trending</span>
						</h4>
						<div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
							{articles &&
								articles?.trending.map(article => {
									return (
										<div
											className="col mb-3"
											key={article.id}
										>
											<Link
												to={`/blog/${article.id}`}
												className="card bg_image"
											>
												<img
													src={article.image}
													alt={article.title}
												/>
												<div className="card-body gradient">
													<h5 className="card-title">
														{article.title}
													</h5>
													<p className="card-text">
														{article.description}
													</p>
													<button
														type="button"
														className="btn link_toDetail"
													>
														Touch Me
													</button>
												</div>
											</Link>
										</div>
									);
								})}
						</div>
					</div>
					<div className="col-md-8 mb-3">
						<h4 className="session_title latest">
							<span>最新消息 Latest</span>
						</h4>
						<div className="card mb-3 bg-transparent">
							{articles &&
								articles?.latest.map(article => {
									return (
										<div
											className="row g-0 align-items-center border-bottom"
											key={article.create_at}
										>
											<div className="col-md-4 my-2">
												<img
													src={article.image}
													className="img-fluid border-0"
													alt={article.title}
												/>
											</div>
											<div className="col-md-8 justify-content-between">
												<div className="card-body">
													<Link
														to={`/blog/${article.id}`}
													>
														<h5 className="card-title fw-bold">
															{article.title}
														</h5>
													</Link>
													<p className="card-text">
														{article.description}
													</p>
												</div>
												<div className="card-body">
													<small className="text-body-secondary">
														{formatTimestamp(
															article.create_at
														)}{' '}
														發佈
													</small>
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="col-md-4 mb-3">
						<h4 className="session_title featured">
							<span>專屬特色 Featured</span>
						</h4>
						{articles &&
							articles?.featured.map(article => {
								return (
									<div
										className="card mb-3 bg-transparent"
										key={article.create_at}
									>
										<img
											src={article.image}
											alt={article.title}
										/>
										<div className="card-body">
											<Link to={`/blog/${article.id}`}>
												<h5 className="card-title">
													{article.title}
												</h5>
											</Link>
											<p className="card-text">
												{article.description}
											</p>
											<p className="card-text">
												<small className="text-body-secondary">
													{formatTimestamp(
														article.create_at
													)}{' '}
												</small>
											</p>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogPage;
