"use client";

import { redirect } from "next/navigation";
import { usePeriodsDispatch } from "../lib/store";

export default function Import() {
  const dispatch = usePeriodsDispatch();

  function handleFile(event: { target: { files: FileList | null } }) {
    if (!event.target?.files) {
      return;
    }

    const reader = new FileReader();
    let importedData = "";

    reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
      if (!progressEvent?.target?.result) {
        return;
      }

      // TODO display immediate feedback/progress
      importedData += progressEvent.target.result as string;
    };

    reader.onloadend = () => {
      // TODO parse and validate JSON and display error
      dispatch({
        type: "loaded",
        periods: JSON.parse(importedData),
      });
      redirect("/");
    };

    reader.onerror = (error) => console.log(error);
    reader.readAsText(event.target.files[0]);
  }

  return (
    <div className="">
      <input type="file" name="file" onChange={handleFile} />
    </div>
  );
}
