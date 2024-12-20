document.addEventListener('DOMContentLoaded', () => {
    const caseDetailsInput = document.getElementById('caseDetails');
    const numLawyersSelect = document.getElementById('numLawyers');
    const themeSelect = document.getElementById('theme');
    const generateButton = document.getElementById('generateButton');
    const discussionSection = document.getElementById('discussion-section');
    const discussionText = document.getElementById('discussion-text');
    const strategySection = document.getElementById('strategy-section');
    const strategyText = document.getElementById('strategy-text');
    const lawyerProfiles = document.getElementById('lawyer-profiles');
    const progressBar = document.getElementById('progress-bar');
    const whatIfSection = document.getElementById('what-if-section');
    const whatIfControls = document.getElementById('what-if-controls');
    const researchSection = document.getElementById('research-section')
    const researchContent = document.getElementById('research-content')


    let selectedLawyers = [];
    let currentPhase = 1;


    // Initial theme check from local storage or set light by default
    const initialTheme = localStorage.getItem('theme') || 'light';
    setTheme(initialTheme);
    themeSelect.value = initialTheme;

    // Initial lawyer card generation
    generateLawyerProfiles();

    lawyerProfiles.addEventListener('click', (event) => {
        if (event.target.closest('.lawyer-card')) {
            const card = event.target.closest('.lawyer-card');
            const lawyerId = card.dataset.lawyerId;
            selectLawyer(lawyerId, card);
        }
    });


    generateButton.addEventListener('click', () => {
        startDiscussion(caseDetailsInput.value, numLawyersSelect.value);
      });

      whatIfControls.addEventListener('click', (event) => {
          if (event.target.tagName === 'BUTTON') {
              const scenario = event.target.dataset.scenario;
              handleWhatIfScenario(scenario);
          }
      });

    themeSelect.addEventListener('change', () => {
        setTheme(themeSelect.value);
    });

      function startDiscussion(caseDetails, numLawyers) {
        currentPhase = 1
        updatePhase();
        generateDiscussion(caseDetails, numLawyers);
        discussionSection.classList.remove('hidden');
        strategySection.classList.remove('hidden');
        researchSection.classList.add('hidden')
        whatIfSection.classList.remove('hidden')
     }

  function generateDiscussion(caseDetails, numLawyers) {

        if (caseDetails.trim() === '') {
            discussionText.innerText = 'Please provide details about the case.';
            strategyText.innerText = '';
            return;
        }

        let discussion = '';
        let strategy = '';

        if (numLawyers === '2') {
            if (selectedLawyers.length === 2) {
                discussion = `${selectedLawyers[0].name}: I think this is a solid case. ${selectedLawyers[1].name}: Agreed, I think we have a clear path to victory.`;
            } else {
                discussion = 'Lawyer 1: I think this is a solid case. Lawyer 2: Agreed, I think we have a clear path to victory.';
            }
             strategy = 'The best strategy is to go with the facts.';
        } else if (numLawyers === '3') {
           if (selectedLawyers.length === 3) {
                discussion = `${selectedLawyers[0].name}: Hmmm, this case has some complexity. ${selectedLawyers[1].name}: Yes, I agree, we need a thorough investigation. ${selectedLawyers[2].name}: I am of the opinion that it’s best to settle.`;
            } else {
                 discussion = 'Lawyer 1: Hmmm, this case has some complexity. Lawyer 2: Yes, I agree, we need a thorough investigation. Lawyer 3: I am of the opinion that it’s best to settle.';
            }
           strategy = 'The best strategy would be to investigate further.';
        } else if (numLawyers === '4') {
            if (selectedLawyers.length === 4) {
                 discussion = `${selectedLawyers[0].name}: I think this is a solid case. ${selectedLawyers[1].name}: Agreed, I think we have a clear path to victory. ${selectedLawyers[2].name}: I think we should approach with caution. ${selectedLawyers[3].name}: Yes, we need to tread carefully with this case.`;
            } else {
                 discussion = 'Lawyer 1: I think this is a solid case. Lawyer 2: Agreed, I think we have a clear path to victory. Lawyer 3: I think we should approach with caution. Lawyer 4: Yes, we need to tread carefully with this case.';
           }
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

   function generateLawyerProfiles() {
        const lawyers = [
            { id: 1, name: 'Ava Martinez', specialty: 'Corporate Law', avatar: './assets/ava.png', responses:{
              "contract": ["According to the contract, there is a breach of contract", "I see no standing in the document"]
            } },
            { id: 2, name: 'Benjamin Lee', specialty: 'Criminal Law', avatar: './assets/ben.png' },
            { id: 3, name: 'Chloe Davis', specialty: 'Immigration Law', avatar: './assets/chloe.png' },
            { id: 4, name: 'Daniel Rodriguez', specialty: 'Business Law', avatar: './assets/daniel.png' },
            { id: 5, name: 'Emily White', specialty: 'Injury Law', avatar: './assets/emily.png' },
             { id: 6, name: 'Frank Green', specialty: 'Family Law', avatar: './assets/frank.png' },
            { id: 7, name: 'Grace Brown', specialty: 'Environmental Law', avatar: './assets/grace.png' },
            { id: 8, name: 'Henry Taylor', specialty: 'Intellectual Property Law', avatar: './assets/henry.png' },
        ];

         lawyerProfiles.innerHTML = lawyers.map(lawyer =>
            `<div class="lawyer-card" data-lawyer-id="${lawyer.id}">
                <img src="${lawyer.avatar}" alt="${lawyer.name}">
                <p>${lawyer.name}</p>
                <p class="specialty">${lawyer.specialty}</p>
            </div>`).join('');
    }


    function selectLawyer(lawyerId, card) {

        const lawyer = getLawyerById(lawyerId);
        if (!lawyer) return;

        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            selectedLawyers = selectedLawyers.filter(lawyer => lawyer.id != lawyerId);
         } else if (selectedLawyers.length < document.getElementById("numLawyers").value) {
             card.classList.add('selected');
             selectedLawyers.push(lawyer);
        }
    }


    function getLawyerById(lawyerId) {
         const lawyers = [
            { id: 1, name: 'Ava Martinez', specialty: 'Corporate Law', avatar: './assets/ava.png', responses:{
                "contract": ["According to the contract, there is a breach of contract", "I see no standing in the document"]
             } },
             { id: 2, name: 'Benjamin Lee', specialty: 'Criminal Law', avatar: './assets/ben.png' },
            { id: 3, name: 'Chloe Davis', specialty: 'Immigration Law', avatar: './assets/chloe.png' },
            { id: 4, name: 'Daniel Rodriguez', specialty: 'Business Law', avatar: './assets/daniel.png' },
            { id: 5, name: 'Emily White', specialty: 'Injury Law', avatar: './assets/emily.png' },
             { id: 6, name: 'Frank Green', specialty: 'Family Law', avatar: './assets/frank.png' },
             { id: 7, name: 'Grace Brown', specialty: 'Environmental Law', avatar: './assets/grace.png' },
             { id: 8, name: 'Henry Taylor', specialty: 'Intellectual Property Law', avatar: './assets/henry.png' },
        ];
        return lawyers.find(lawyer => lawyer.id == lawyerId)
    }

    function updatePhase() {
            const phases = progressBar.querySelectorAll('.phase');
            phases.forEach(phase => phase.classList.remove('active'));
            phases[currentPhase-1].classList.add('active');
    }

    function handleWhatIfScenario(scenario) {
      switch (scenario) {
          case "evidence":
            discussionText.innerText = 'Lawyers: Ok, the new evidence changes everything. ';
             break;
            case "witness":
              discussionText.innerText = 'Lawyers: Ok, a new witness, what does he know?.';
             break;
          case "law":
               discussionText.innerText = 'Lawyers: We now have a new law that must be considered.';
                break;
             default:
              break;
        }
         currentPhase++;
         updatePhase()
         if(currentPhase > 3) {
           whatIfSection.classList.add('hidden');
           generateResearchSection();
            }
    }

    function generateResearchSection() {
        researchSection.classList.remove('hidden');

        // Simulated Legal Research based on the case details or selected lawyers
         let researchText = `
           <p>Upon analyzing the case, we found these relevant precedents: </p>
           <p><strong>Case 1:</strong> Example case that establishes precedent.</p>
           <p><strong>Case 2:</strong> Another example case with a relevant ruling.</p>
        `;
        researchContent.innerHTML = researchText;
    }
});
