document.addEventListener('DOMContentLoaded', function() {
    const formBuilder = document.getElementById('formBuilder');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionButton = document.getElementById('addQuestion');
    const questionTemplate = document.getElementById('questionTemplate');
    const optionTemplate = document.getElementById('optionTemplate');
    
    let questionCounter = 0;
    
    function addQuestion() {
        const questionElement = questionTemplate.content.cloneNode(true);
        const questionBlock = questionElement.querySelector('.question-block');
        
        const questionId = `question_${questionCounter++}`;
        questionBlock.dataset.questionId = questionId;
        
        setupQuestionEventListeners(questionBlock);
        
        questionsContainer.appendChild(questionBlock);
    }
    
    function setupQuestionEventListeners(questionBlock) {
        const questionType = questionBlock.querySelector('.question-type');
        const optionsContainer = questionBlock.querySelector('.options-container');
        const addOptionButton = questionBlock.querySelector('.add-option');
        const removeQuestionButton = questionBlock.querySelector('.remove-question');
        
        questionType.addEventListener('change', function() {
            if (this.value === 'multipleChoice') {
                optionsContainer.classList.remove('d-none');
                const optionsList = optionsContainer.querySelector('.options-list');
                if (optionsList.children.length === 0) {
                    addOption(optionsList);
                    addOption(optionsList);
                }
            } else {
                optionsContainer.classList.add('d-none');
            }
        });
        
        addOptionButton.addEventListener('click', function() {
            const optionsList = optionsContainer.querySelector('.options-list');
            addOption(optionsList);
        });
        
        removeQuestionButton.addEventListener('click', function() {
            questionBlock.remove();
        });
    }
    
    // Function to add a new option to a multiple choice question
    function addOption(optionsList) {
        const optionElement = optionTemplate.content.cloneNode(true);
        const optionBlock = optionElement.querySelector('.input-group');
        
        const removeOptionButton = optionBlock.querySelector('.remove-option');
        removeOptionButton.addEventListener('click', function() {
            if (optionsList.children.length > 1) {
                optionBlock.remove();
            } else {
                alert('You must have at least one option for a multiple choice question.');
            }
        });
        
        optionsList.appendChild(optionBlock);
    }
    
    addQuestionButton.addEventListener('click', addQuestion);
    
    // Form submission handler
    formBuilder.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (questionsContainer.children.length === 0) {
            alert('Please add at least one question to your form.');
            return;
        }
        
        const formTitle = document.getElementById('formTitle').value;
        
        const formData = {
            formTitle: formTitle,
            questions: []
        };
        
        const questionBlocks = questionsContainer.querySelectorAll('.question-block');
        questionBlocks.forEach((block, index) => {
            const questionText = block.querySelector('.question-text').value;
            const questionType = block.querySelector('.question-type').value;
            const questionId = `q${index}`;
            
            const questionData = {
                id: questionId,
                text: questionText,
                type: questionType
            };
            
            if (questionType === 'multipleChoice') {
                const optionInputs = block.querySelectorAll('.option-text');
                const options = Array.from(optionInputs).map(input => input.value.trim()).filter(val => val);
                
                if (options.length === 0) {
                    alert('Please add at least one option for each multiple choice question.');
                    throw new Error('Missing options for multiple choice question');
                }
                
                questionData.options = options;
            }
            
            formData.questions.push(questionData);
        });
        
        try {
            const response = await fetch('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: formTitle })
            });
            
            const data = await response.json();
            const formId = data.formId;
            
            localStorage.setItem(`form_${formId}`, JSON.stringify(formData));
            
            window.location.href = `/${formId}`;
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating form. Please try again.');
        }
    });
    
    // Add an initial question
    addQuestion();
});