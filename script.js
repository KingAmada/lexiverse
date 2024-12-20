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
    const researchSection = document.getElementById('research-section');
    const researchContent = document.getElementById('research-content');
    const moodSlidersContainer = document.querySelector('.mood-sliders')
    const audioPlayer = document.getElementById('audio-player');



    let selectedLawyers = [];
    let currentPhase = 1;
    let lawyerMoods = {};

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
         researchSection.classList.add('hidden');
         whatIfSection.classList.remove('hidden');

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
                discussion = generateLawyerDialogue(selectedLawyers[0],selectedLawyers[1], caseDetails);
            } else {
                  discussion =  'Lawyer 1: I think this is a solid case. Lawyer 2: Agreed, I think we have a clear path to victory.';

            }
            strategy = 'The best strategy is to go with the facts.';
        } else if (numLawyers === '3') {
           if (selectedLawyers.length === 3) {
                 discussion = generateLawyerDialogue(selectedLawyers[0], selectedLawyers[1], selectedLawyers[2], caseDetails)

            } else {
                  discussion =  'Lawyer 1: Hmmm, this case has some complexity. Lawyer 2: Yes, I agree, we need a thorough investigation. Lawyer 3: I am of the opinion that it’s best to settle.';
            }
             strategy = 'The best strategy would be to investigate further.';
         } else if (numLawyers === '4') {
            if (selectedLawyers.length === 4) {
                discussion = generateLawyerDialogue(selectedLawyers[0], selectedLawyers[1],selectedLawyers[2],selectedLawyers[3], caseDetails)

            } else {
                discussion = 'Lawyer 1: I think this is a solid case. Lawyer 2: Agreed, I think we have a clear path to victory. Lawyer 3: I think we should approach with caution. Lawyer 4: Yes, we need to tread carefully with this case.';
            }
             strategy = 'The best strategy would be to approach with caution, and present facts.';
        }


       discussionText.innerHTML = discussion;
        strategyText.innerText = strategy;

   }
  // Generate more sophistacated and varied responses
    function generateLawyerDialogue(...lawyers) {
     let dialog = '';
      const responses = {
       "initial":  ["I think this case is viable.", "I think we have a solid chance of winning.", "I'm not sure about this one.", "This could be tricky."],
       "evidence":  ["Based on this evidence we have a better shot.", "I am not sure this is enough to move forward","This evidence is going to be helpful."],
        "witness":  ["I think this witness can help us.", "I'm not sure about this witness.","This witness does not have any credibilty"],
         "law": ["This new law will have some impact", "This new law actually helps our case."]
        }
     for (let i = 0; i < lawyers.length; i++) {
         const lawyer = lawyers[i];
        let response = '';

         if(currentPhase == 1) {
            response =  responses.initial[Math.floor(Math.random()* responses.initial.length)];
           }else if(currentPhase == 2) {
              response = responses.evidence[Math.floor(Math.random()* responses.evidence.length)]
         }else if (currentPhase == 3) {
           response = responses.law[Math.floor(Math.random()* responses.law.length)]
         }

         const mood = lawyerMoods[lawyer.id] || 5;
         let  moodAdjustedResponse = response
         if(mood < 3) {
             moodAdjustedResponse = `I am not very confident in this case. ${response}`;
        }else if( mood > 7) {
            moodAdjustedResponse = `I think we have a great case, so, ${response}`
        }

         dialog += `<p>${lawyer.name}: ${moodAdjustedResponse} <button class="audio-button" data-lawyer-id="${lawyer.id}" data-mood="${mood}" data-text="${response}" >Audio</button> </p>`;
      }
     return dialog;
    }

    // Function to set theme and save to localStorage
    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }

     function generateLawyerProfiles() {
        const lawyers = [
            { id: 1, name: 'Ava Martinez', specialty: 'Corporate Law', avatar: './assets/ava.png', audio: {
                "I think this case is viable.": "./assets/voice1.mp3",
                "I think we have a solid chance of winning.": "./assets/voice2.mp3",
            }, responses: {
                  "contract": ["According to the contract, there is a breach of contract", "I see no standing in the document"]
            }},
            { id: 2, name: 'Benjamin Lee', specialty: 'Criminal Law', avatar: './assets/ben.png' , audio: {
                  "I think this case is viable.": "./assets/voice3.mp3",
                  "I think we have a solid chance of winning.": "./assets/voice4.mp3",
                }},
            { id: 3, name: 'Chloe Davis', specialty: 'Immigration Law', avatar: './assets/chloe.png', audio: {
                  "I think this case is viable.": "./assets/voice5.mp3",
                  "I think we have a solid chance of winning.": "./assets/voice6.mp3",
                }},
            { id: 4, name: 'Daniel Rodriguez', specialty: 'Business Law', avatar: './assets/daniel.png', audio: {
                  "I think this case is viable.": "./assets/voice7.mp3",
                   "I think we have a solid chance of winning.": "./assets/voice8.mp3",
                }},
            { id: 5, name: 'Emily White', specialty: 'Injury Law', avatar: './assets/emily.png' ,audio: {
                  "I think this case is viable.": "./assets/voice9.mp3",
                  "I think we have a solid chance of winning.": "./assets/voice10.mp3",
                }},
            { id: 6, name: 'Frank Green', specialty: 'Family Law', avatar: './assets/frank.png', audio: {
                  "I think this case is viable.": "./assets/voice11.mp3",
                  "I think we have a solid chance of winning.": "./assets/voice12.mp3",
                }},
            { id: 7, name: 'Grace Brown', specialty: 'Environmental Law', avatar: './assets/grace.png', audio: {
                  "I think this case is viable.": "./assets/voice13.mp3",
                   "I think we have a solid chance of winning.": "./assets/voice14.mp3",
                }},
            { id: 8, name: 'Henry Taylor', specialty: 'Intellectual Property Law', avatar: './assets/henry.png', audio: {
                  "I think this case is viable.": "./assets/voice15.mp3",
                   "I think we have a solid chance of winning.": "./assets/voice16.mp3",
                }},
        ];

        lawyerProfiles.innerHTML = lawyers.map(lawyer =>
            `<div class="lawyer-card" data-lawyer-id="${lawyer.id}">
                 <img src="${lawyer.avatar}" alt="${lawyer.name}">
                <p>${lawyer.name}</p>
                <p class="specialty">${lawyer.specialty}</p>
            </div>`).join('');

      // Generate mood sliders for each lawyer
      let moodSlidersHTML = ''
        lawyers.forEach(lawyer => {
           moodSlidersHTML += `
                <div class="mood-slider">
                  <label for="mood-${lawyer.id}">${lawyer.name}: Mood</label>
                   <input type="range" id="mood-${lawyer.id}" min="1" max="10" value="5" data-lawyer-id="${lawyer.id}" class="mood-range">
               </div>`;
        });

      moodSlidersContainer.innerHTML = moodSlidersHTML;
      //Mood input logic
      document.querySelectorAll('.mood-range').forEach(slider => {
         slider.addEventListener('input', (e) => {
           lawyerMoods[e.target.dataset.lawyerId] = parseInt(e.target.value, 10)
           });
       });

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
             { id: 1, name: 'Ava Martinez', specialty: 'Corporate Law', avatar: './assets/ava.png', audio: {
                "I think this case is viable.": "./assets/voice1.mp3",
                "I think we have a solid chance of winning.": "./assets/voice2.mp3",
            }, responses: {
                  "contract": ["According to the contract, there is a breach of contract", "I see no standing in the document"]
             }},
           { id: 2, name: 'Benjamin Lee', specialty: 'Criminal Law', avatar: './assets/ben.png', audio: {
                "I think this case is viable.": "./assets/voice3.mp3",
                "I think we have a solid chance of winning.": "./assets/voice4.mp3",
           } },
           { id: 3, name: 'Chloe Davis', specialty: 'Immigration Law', avatar: './assets/chloe.png', audio: {
                 "I think this case is viable.": "./assets/voice5.mp3",
                 "I think we have a solid chance of winning.": "./assets/voice6.mp3",
           } },
           { id: 4, name: 'Daniel Rodriguez', specialty: 'Business Law', avatar: './assets/daniel.png', audio: {
                "I think this case is viable.": "./assets/voice7.mp3",
                "I think we have a solid chance of winning.": "./assets/voice8.mp3",
           }},
           { id: 5, name: 'Emily White', specialty: 'Injury Law', avatar: './assets/emily.png', audio: {
                "I think this case is viable.": "./assets/voice9.mp3",
                "I think we have a solid chance of winning.": "./assets/voice10.mp3",
           } },
           { id: 6, name: 'Frank Green', specialty: 'Family Law', avatar: './assets/frank.png' , audio: {
                "I think this case is viable.": "./assets/voice11.mp3",
                 "I think we have a solid chance of winning.": "./assets/voice12.mp3",
          }},
           { id: 7, name: 'Grace Brown', specialty: 'Environmental Law', avatar: './assets/grace.png', audio: {
                 "I think this case is viable.": "./assets/voice13.mp3",
                  "I think we have a solid chance of winning.": "./assets/voice14.mp3",
           } },
           { id: 8, name: 'Henry Taylor', specialty: 'Intellectual Property Law', avatar: './assets/henry.png', audio: {
                "I think this case is viable.": "./assets/voice15.mp3",
                 "I think we have a solid chance of winning.": "./assets/voice16.mp3",
            } },
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
        if (currentPhase > 3) {
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

    discussionSection.addEventListener('click', (event) => {
     if(event.target.classList.contains("audio-button")) {
           const lawyerId = event.target.dataset.lawyerId;
          const audioText = event.target.dataset.text
          playAudio(audioText, getLawyerById(lawyerId));
       }
      });

   function playAudio(text, lawyer) {
       if(lawyer && lawyer.audio && lawyer.audio[text]) {
          audioPlayer.src = lawyer.audio[text];
          audioPlayer.play();
       }
   }

});
