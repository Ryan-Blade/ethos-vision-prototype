import { useState } from 'react';
import './index.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError('Please select a valid image file (JPEG, PNG).');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // In a real hackathon, you'd want the full URL or a proxy setup
      const response = await fetch('http://localhost:5000/audit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze the image. Please check your backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Ethos-Vision: Autonomous Supply Chain Oracle</h1>
        <p>Upload a product image, receipt, or barcode to receive an AI-powered ethical audit.</p>
      </header>

      <main className="main-content">
        <div className="upload-section">
          <div className="file-input-wrapper">
            <input 
              type="file" 
              id="file-upload" 
              accept="image/*" 
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="file-upload" className="file-label">
              {selectedFile ? selectedFile.name : 'Choose an Image...'}
            </label>
          </div>
          
          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}

          <button 
            className="analyze-btn" 
            onClick={handleAnalyze} 
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
        </div>

        {result && (
          <div className="result-section">
            <h2>Audit Results</h2>
            <div className="result-card">
              <div className="result-header">
                <h3>{result.product_name || 'Unknown Product'}</h3>
                <span className={`score-badge ${
                  result.ethos_score >= 80 ? 'high' : 
                  result.ethos_score >= 50 ? 'medium' : 'low'
                }`}>
                  Ethos Score: {result.ethos_score || 'N/A'}/100
                </span>
              </div>
              {result.brand_name && (
                <p className="brand-name">Brand: {result.brand_name}</p>
              )}
              <div className="summary">
                <h4>Ethical Summary:</h4>
                <p>{result.summary || 'No summary provided.'}</p>
              </div>
              <details className="raw-json-details">
                <summary>View Raw JSON</summary>
                <pre className="raw-json">{JSON.stringify(result, null, 2)}</pre>
              </details>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
