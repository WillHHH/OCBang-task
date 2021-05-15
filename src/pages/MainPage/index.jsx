import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";

import MockDataService from "../../services/mockData";
import styles from "./MainPage.module.scss";
import Nav from "../../components/Nav";
import TableGrid from "../../components/TableGrid";
import JobReview from "../../components/JobReview";
import EmailTemp from "../../components/EmailTemp";

const MainPage = () => {
  const [talentData, setTalentData] = useState({});
  const [jdData, setJdData] = useState({});
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  const [isLoading, setIsLoading] = useState({});
  const [matchedArr, setMatchedArr] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "" });
  const [currenTalent, setCurrenTalent] = useState({ index: 0, id: "" });

  useEffect(() => {
    const { page, size } = pageInfo;
    handleFetchJsonData({ type: "talent", page, size });
    setMatchedArr([]);
  }, [pageInfo]);

  useEffect(() => {
    jdData?.count > 0 && handleMatchJobs();
    // eslint-disable-next-line
  }, [talentData]);

  const handleFetchJsonData = async ({ type, page = 1, size = 10 }) => {
    setIsLoading((state) => ({ ...state, [type]: true }));
    try {
      const result = await MockDataService.getJson({
        type,
        page,
        size,
      });

      if (result.data.status === 200) {
        setIsLoading((state) => ({ ...state, [type]: false }));
        if (type === "talent") {
          setTalentData(result.data.data);
        } else if (type === "jd") {
          setJdData(result.data.data);
        }
      } else throw result.data;
    } catch (error) {
      setIsLoading((state) => ({ ...state, [type]: false }));
      console.log("fetchJson", error);
    }
  };

  const handleClickTable = (cx, record, index) => {
    setCurrenTalent({ index, id: record.id, name: record.talentName });
    if (cx.indexOf("link") !== -1) {
      window.location.href = record.linkedInUrl;
    } else if (cx.indexOf("matched") !== -1) {
      setIsModalVisible(true);
      setModalContent({ title: "Matched Jobs" });
    } else if (cx.indexOf("email") !== -1) {
      if (!matchedArr.length) {
        message.warning("No matched jobs");
      } else {
        setIsModalVisible(true);
        setModalContent({ title: "Email Template" });
      }
    }
  };

  const handleMatchJobs = () => {
    setMatchedArr([]);
    const newTalentData = { ...talentData };
    newTalentData?.paged?.map((value, index) => {
      let result = [];
      let i = 0;
      while (result.length < 4) {
        let item = jdData.data[i];
        if (
          value.location === item.location ||
          value.techStack === item.techStack ||
          value.seniority === item.seniority ||
          value.iom === item.iom
        ) {
          result = [...result, item];
        }
        i++;
      }
      newTalentData.paged[index]["matched"] = `${result.length} jobs`;
      setMatchedArr((state) => [...state, { id: value.id, data: result }]);
      return null;
    });
  };

  const handleRenderContent = () => {
    const { index, id, name } = currenTalent;
    const jobs = matchedArr[index]?.id === id && matchedArr[index].data;

    if (modalContent.title === "Matched Jobs") {
      return <JobReview jobs={jobs} />;
    } else if (modalContent.title === "Email Template") {
      return <EmailTemp name={name} jobs={jobs} />;
    }
  };

  return (
    <div className={styles.base}>
      <h1 className={styles.title}>OCInsights Automated Newsletter System</h1>
      <Nav
        handleFetchJsonData={handleFetchJsonData}
        jdData={jdData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleMatchJobs={handleMatchJobs}
      />
      <TableGrid
        dataSource={talentData}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        handleClickTable={handleClickTable}
        isLoading={isLoading}
        matchedArr={matchedArr}
      />
      <Modal
        title={modalContent.title}
        visible={isModalVisible}
        okText={modalContent.title === "Email Template" ? "Send" : "Ok"}
        onOk={() =>
          modalContent.title === "Email Template"
            ? message.success("Success")
            : setIsModalVisible(false)
        }
        onCancel={() => setIsModalVisible(false)}
      >
        {handleRenderContent()}
      </Modal>
    </div>
  );
};

export default MainPage;
