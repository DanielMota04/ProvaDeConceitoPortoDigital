import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";

const App = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);

  const handleFileChange = (ev) => {
    const selectedFile = ev.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    if (!file) {
      console.warn("Nenhum arquivo selecionado");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setJsonData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>Upload de Planilha</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <br />
      <button onClick={handleFileUpload}>Ler arquivo</button>
      <div>
        <h3>Dados:</h3>
        <pre>
          {jsonData.length > 0
            ? JSON.stringify(jsonData, null, 2)
            : "Nenhum dado a ser exibido"}
        </pre>
      </div>
    </div>
  );
};

export default App