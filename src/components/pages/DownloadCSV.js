import React from 'react';
import { useSelector } from 'react-redux';

import { FcDownload } from "react-icons/fc";

const DownloadCSV = (props) => {
    const isActivated = useSelector(state => state.theme.isActivated);
    function makeCSV(rows) {
        let main = [["Id", "Category", "Description", "Expense"]];
        for (let i = 0; i < rows.length; i++) {
            let arr = [];
            for (let [key, value] of Object.entries(rows[i])) {
                arr.push(value);
            }
            main.push(arr);
        }
        return main.map(row => row.join(",")).join("\n");
    }
    const blob = new Blob([makeCSV(props.data)]);
    const t = URL.createObjectURL(blob);
    return (
        <React.Fragment>
            {isActivated && <a href={t} id="download" download="data.csv"><FcDownload/></a>}
        </React.Fragment>
    );
}

export default DownloadCSV;