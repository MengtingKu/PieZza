import PropTypes from 'prop-types';

const DynamicTable = ({ data, fields, endActions, tFooter = null }) => {
	const renderTableHeader = () => {
		return fields
			.map((field, index) => <th key={index}>{field.name}</th>)
			.concat(
				endActions ? (
					<th
						key="actions"
						width={endActions.length > 1 ? '25%' : '10%'}
					/>
				) : null
			);
	};

	const renderTableRows = () => {
		return data?.map((item, dataIndex) => (
			<tr key={item.id} className="text-center">
				{fields.map((field, index) => {
					const renderTd = (type, value) => {
						switch (type) {
							case 'dataNo':
								return <>{field.render(dataIndex)}</>;
							case 'number':
								return (
									<span className="text-end">
										{item[field.key] &&
											item[field.key].toLocaleString()}
									</span>
								);
							case 'img':
								return (
									<img
										src={value}
										alt={field.name}
										className={`img-fluid ${field.class}`}
									/>
								);
							case 'custom': {
								return <>{field.render(item)}</>;
							}
							default:
								return (
									<span className="text-start">
										{item[field.key]}
									</span>
								);
						}
					};

					return (
						<td
							key={index}
							className={field.class}
							width={field.width || 'auto'}
						>
							{renderTd(field.type, item[field.key] || '-')}
						</td>
					);
				})}

				{endActions && (
					<td className="text-end align-middle">
						<div className="btn-group btn-group-sm me-2">
							{endActions.map((action, idx) => (
								<button
									type="button"
									className={action.class}
									key={idx}
									onClick={() => action.handler(item)}
									disabled={
										action.disabled
											? action.disabled(item.id)
											: false
									}
								>
									{action.disabled &&
									action.disabled(item.id) ? (
										<>
											<span role="status">
												{action.render(item)}
											</span>
											<span
												className="spinner-border spinner-border-sm"
												aria-hidden="true"
											></span>
										</>
									) : (
										<>{action.render(item)}</>
									)}
								</button>
							))}
						</div>
					</td>
				)}
			</tr>
		));
	};

	return (
		<div className="table-responsive dynamic_table">
			<table className="table table-sm table-hover align-middle">
				<thead>
					<tr className="text-center">{renderTableHeader()}</tr>
				</thead>
				<tbody className="table-group-divider">
					{renderTableRows()}
				</tbody>
				{tFooter}
			</table>
		</div>
	);
};

DynamicTable.propTypes = {
	data: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired,
	endActions: PropTypes.array,
	tFooter: PropTypes.node,
};

export default DynamicTable;
