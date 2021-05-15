import React, { useState } from "react";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";

const EmailTemp = ({ name, jobs }) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(`
    <p>Hi ${name},</p>
    <br/>
    <p>This is Kirby who has connected with you on LinkedIn several days ago. I would like to share the open opportunities that could be a good match for you.  Meanwhile, I’d love to send the job openings that could be a good fit along with our insights to you every week. Hope the information could help you more with your career choice. </p>
    <br/>
    <a href=${jobs[0].jobUrl} target="blank">
    <p>1. ${jobs[0].jobName} ${jobs[0].company} ${jobs[0].location}</p>
    </a>
    <br/>
    <a href=${jobs[1].jobUrl} target="blank">
    <p>2. ${jobs[1].jobName} ${jobs[1].company} ${jobs[1].location}</p>
    </a>
    <br/>
    <a href=${jobs[2].jobUrl} target="blank">
    <p>3. ${jobs[2].jobName} ${jobs[2].company} ${jobs[2].location}</p>
    </a>
    <br/>
    <a href=${jobs[3].jobUrl} target="blank">
    <p>4. ${jobs[3].jobName} ${jobs[3].company} ${jobs[3].location}</p>
    </a>
    <br/>
    <p>Thanks,</p>
    <br/>
    <p>Kirby</p>
    `)
  );
  const [outputHTML, setOutputHTML] = useState("");

  const handleChange = (editorState) => {
    setEditorState(editorState);
    setOutputHTML(editorState.toHTML());
  };

  return (
    <div>
      <div>
        <BraftEditor
          value={editorState}
          onChange={handleChange}
          language="en"
        />
      </div>
      {outputHTML && (
        <>
          <h5>Output</h5>
          <div>{outputHTML}</div>
        </>
      )}
    </div>
  );
};

export default EmailTemp;
