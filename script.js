document.addEventListener('DOMContentLoaded', () => {
  const caseDetailsInput = document.getElementById('caseDetails');
  const numLawyersSelect = document.getElementById('numLawyers');
  const themeSelect = document.getElementById('theme');
  const generateButton = document.getElementById('generateButton');
  const discussionSection = document.getElementById('discussion-section');
  const discussionText = document.getElementById('discussion-text');
  const strategySection = document.getElementById('strategy-section');
  const strategyText = document.getElementById('strategy-text');


    //Initial theme check from local storage or set light by default
  const initialTheme = localStorage.getItem('theme') || 'light';
    setTheme(initialTheme);
  themeSelect.value = initialTheme;


  generateButton.addEventListener('click', () => {
        generateDiscussion(caseDetailsInput.value, numLawyersSelect.value);
        discussionSection.classList.remove('hidden');
        strategySection.classList.remove('hidden');

    });

  themeSelect.addEventListener('change', () => {
      setTheme(themeSelect.value);
      });

  function generateDiscussion(caseDetails, numLawyers) {

      if (caseDetails.trim() === '') {
          discussionText.innerText = 'Please provide details about the case.';
          strategyText.innerText = '';
          return;
      }

      let discussion = '';
      let strategy = '';

      if (numLawyers === '2') {
          discussion = 'Lawyer 1: I think this is a solid case. Lawyer 2: Agreed, I think we have a clear path to victory.';
          strategy = 'The best strategy is to go with the facts.';
      } else if (numLawyers === '3') {
          discussion = 'Lawyer 1: Hmmm, this case has some complexity. Lawyer 2: Yes, I agree, we need a thorough investigation. Lawyer 3: I am of the opinion that it’s best to settle.';
          strategy = 'The best strategy would be to investigate further.';
      } else if (numLawyers === '4') {
          discussion = 'Lawyer 1: I think this is a solid case. Lawyer 2: Agreed, I think we have a clear path to victory. Lawyer 3: I think we should approach with caution. Lawyer 4: Yes, we need to tread carefully with this case.';
          strategy = 'The best strategy would be to approach with caution, and present facts.';
      }

      discussionText.innerText = discussion;
      strategyText.innerText = strategy;

  }
    // Function to set theme and save to localStorage
  function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }


});
