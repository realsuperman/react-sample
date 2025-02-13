import { useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  console.log("API Base URL:", apiBaseUrl); // 환경 변수 확인

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiBaseUrl}/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("업로드 완료");
        fetchImages(); // 업로드 후 이미지 목록 새로고침
      } else {
        alert("업로드 실패");
      }
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/find`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("이미지 불러오기 실패:", error);
    }
  };

  return (
    <div className="App">
      <h1>이미지 업로드</h1>
      <input type="file" onChange={handleUpload} />
      <button onClick={fetchImages}>사진 보기</button>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.path}
            alt="Uploaded"
            style={{ width: "150px", height: "150px", objectFit: "cover", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
