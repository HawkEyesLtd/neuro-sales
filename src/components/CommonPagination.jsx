import { Pagination } from 'antd';

function CommonPagination({
    current,
    total: totalItems,
    pageSize: itemsPerPage,
    onChange,
    showSizeChanger = true,
    showQuickJumper = true,
    showTotal = true,
    size = 'default',
    style = {},
    className = '',
    disabled = false,
    hideOnSinglePage = false,
    pageSizeOptions = [10, 20, 30, 40, 50],
}) {
    const handleChange = (newPage, newPageSize) => {
        onChange?.(newPage, newPageSize);
    };

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', ...style }}
            className={className}
        >
            <Pagination
                current={current}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handleChange}
                showSizeChanger={showSizeChanger}
                showQuickJumper={showQuickJumper}
                showTotal={
                    showTotal
                        ? (totalCount, range) => `${range[0]}-${range[1]} of ${totalCount} records`
                        : false
                }
                size={size}
                disabled={disabled}
                // hideOnSinglePage={hideOnSinglePage}
                pageSizeOptions={pageSizeOptions}
                pageSizes={pageSizeOptions}
                defaultCurrent={1}
                defaultPageSize={15}
            />
        </div>
    );
}

CommonPagination.defaultProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true,
    size: 'default',
    style: {},
    className: '',
    disabled: false,
    hideOnSinglePage: false,
};

export default CommonPagination;
