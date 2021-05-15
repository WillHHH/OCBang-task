import React from "react";
import { Card } from "antd";

import styles from "./JobReview.module.scss";

const JobReview = ({ jobs }) => {

	return (
    <div className={styles.base}>
      {jobs?.map((v, i) => (
        <div key={`${v.company}${i}`} className={styles.card}>
          <Card
            title={v.company}
            extra={
              <a href={v.jobUrl} target="blank">
                Link
              </a>
            }
            size="small"
            style={{ width: 200 }}
          >
            <p>{v.location}</p>
            <p>{v.jobName}</p>
            <p>{v.techStack}</p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default JobReview;
