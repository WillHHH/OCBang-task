import React, { useState, useEffect } from "react";
import { Table } from "antd";
import styles from "./TableGrid.module.scss";
import { talentColumns } from "../../constant/talentColumns";

const TableGrid = ({
  dataSource,
  pageInfo,
  setPageInfo,
  handleClickTable,
  isLoading,
  matchedArr,
}) => {
  const [columns, setColumns] = useState(talentColumns);

  useEffect(() => {
    matchedArr.length &&
      columns.length === 7 &&
      setColumns((state) => [
        ...state,
        {
          title: "Matched Result",
          dataIndex: "matched",
          key: "matched",
          className: "matched",
          width: 100,
        },
      ]);
  }, [matchedArr, columns.length]);

  return (
    <div className={styles.base}>
      <Table
        columns={columns}
        dataSource={dataSource.paged}
        rowKey="id"
        bordered
        scroll={{ y: 500 }}
        loading={isLoading?.talent}
        pagination={{
          responsive: true,
          size: "small",
          total: dataSource.count,
          showTotal: (total) => `Total ${total} items`,
          defaultPageSize: 10,
          hideOnSinglePage: true,
          current: pageInfo.page,
          onChange: (num) => {
            setPageInfo((state) => ({ ...state, page: num }));
          },
        }}
        onRow={(record, index) => {
          return {
            onClick: (e) => {
              handleClickTable(e.target.className, record, index);
            },
          };
        }}
      />
    </div>
  );
};

export default TableGrid;
