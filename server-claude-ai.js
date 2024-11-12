const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const errorText = document.getElementById('errorText');
const imageDisplay = document.getElementById('imageDisplay');

// API endpoint
const API_URL = 'http://localhost:3000/dream';

// List of prohibited terms
const prohibitedTerms = ['alert', 'script', 'eval', 'fetch'];

function validatePrompt(prompt) {
  if (!prompt.trim()) return false;
  return !prohibitedTerms.some(term =>
    prompt.toLowerCase().includes(term),
  );
}

function showError(message) {
  errorText.textContent = message;
  errorText.style.display = 'block';
}

function hideError() {
  errorText.style.display = 'none';
}

function setLoading(loading) {
  generateBtn.disabled = loading;
  promptInput.disabled = loading;
  imageDisplay.innerHTML = loading ?
    '<span class="placeholder-text">Generating image...</span>' :
    '<span class="placeholder-text">Image will appear here</span>';
}

function displayImage(imageUrl) {
  imageDisplay.innerHTML = `<img src="${imageUrl}" alt="Generated image">`;
}

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value;
  hideError();

  if (!validatePrompt(prompt)) {
    showError('Please enter a valid prompt');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data = await response.json();
    displayImage(data.image);

  } catch (error) {
    showError(error.message);
    console.error('Generation error:', error);
  } finally {
    setLoading(false);
  }
});

// Handle Enter key
promptInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !generateBtn.disabled) {
    e.preventDefault();
    generateBtn.click();
  }
});