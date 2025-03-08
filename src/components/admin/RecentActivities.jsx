import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatTimestamp } from '@helper/stringAndDataHelpers';

const RecentActivities = () => {
    const { isArticleLoading, articles } = useSelector(
        state => state.adminArticle
    );

    return (
        <div className="card">
            <div className="card-header">近期活動 & 文章</div>
            <div className="card-body">
                <div className="text-end">
                    <Link
                        to="article-list"
                        className="btn btn-outline-secondary btn-sm mb-3"
                        type="button"
                    >
                        文章管理
                    </Link>
                </div>

                {!isArticleLoading &&
                    articles
                        .filter(article => article.category === 'latest')
                        .map(item => {
                            return (
                                <div className="border p-2 mb-2" key={item.id}>
                                    <span className="fw-bold">
                                        {item.title}
                                    </span>
                                    <small className="text-secondary">
                                        {' '}
                                        - {item.author}{' '}
                                        {formatTimestamp(item.create_at)}
                                        發布
                                    </small>
                                </div>
                            );
                        })}
            </div>
        </div>
    );
};

export default RecentActivities;
