import React from "react";
import MainButton from "../MainButton";
import styles from "./Nav.module.scss";

const Nav = ({ handleFetchJsonData, jdData, isLoading, handleMatchJobs }) => {
  return (
    <div className={styles.base}>
      <div>
        <MainButton
          isLoading={isLoading?.jd}
          label="JD Import"
          onClick={() => handleFetchJsonData({ type: "jd" })}
        />
        {jdData?.count && (
          <span className={styles.notice}>{jdData.count} Records</span>
        )}
      </div>
      <MainButton
        disabled={!jdData?.count}
        label=" Match Jobs"
        onClick={handleMatchJobs}
      />
    </div>
  );
};

export default Nav;
