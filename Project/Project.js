     // Quiz questions - 10 multiple choice questions
        const quizQuestions = [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language",
                    "Hyper Transfer Markup Language",
                    "Home Tool Markup Language"
                ],
                correctAnswer: 0
            },
            {
                question: "Which CSS property is used to change text color?",
                options: [
                    "text-color",
                    "font-color",
                    "color",
                    "text-style"
                ],
                correctAnswer: 2
            },
            {
                question: "In JavaScript, which keyword is used to declare a variable?",
                options: [
                    "var",
                    "let",
                    "const",
                    "All of the above"
                ],
                correctAnswer: 3
            },
            {
                question: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style System",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ],
                correctAnswer: 2
            },
            {
                question: "Which HTML tag is used to create a hyperlink?",
                options: [
                    "<link>",
                    "<a>",
                    "<href>",
                    "<hyperlink>"
                ],
                correctAnswer: 1
            },
            {
                question: "Which JavaScript method is used to select an HTML element by its id?",
                options: [
                    "document.querySelector()",
                    "document.getElementById()",
                    "document.getElementByClass()",
                    "document.findElement()"
                ],
                correctAnswer: 1
            },
            {
                question: "What is the correct way to write a comment in JavaScript?",
                options: [
                    "<!-- This is a comment -->",
                    "// This is a comment",
                    "/* This is a comment */",
                    "Both 2 and 3"
                ],
                correctAnswer: 3
            },
            {
                question: "Which Bootstrap class is used for a primary button?",
                options: [
                    "btn-main",
                    "btn-primary",
                    "btn-blue",
                    "btn-default"
                ],
                correctAnswer: 1
            },
            {
                question: "In CSS, which property is used to add space between elements?",
                options: [
                    "spacing",
                    "margin",
                    "padding",
                    "Both 2 and 3"
                ],
                correctAnswer: 3
            },
            {
                question: "Which symbol is used for strict equality comparison in JavaScript?",
                options: [
                    "==",
                    "===",
                    "=",
                    "!="
                ],
                correctAnswer: 1
            }
        ];

        // Variables to track quiz state
        let currentQuestionIndex = 0;
        let score = 0;
        let userAnswers = [];
        let quizCompleted = false;

        // DOM elements
        const quizContainer = document.getElementById('quizContainer');
        const resultsContainer = document.getElementById('resultsContainer');
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('optionsContainer');
        const nextButton = document.getElementById('nextButton');
        const restartButton = document.getElementById('restartButton');
        const questionNumber = document.getElementById('questionNumber');
        const questionCounter = document.getElementById('questionCounter');
        const progressFill = document.getElementById('progressFill');
        const scoreCircle = document.getElementById('scoreCircle');
        const feedbackText = document.getElementById('feedbackText');

        // Initialize the quiz
        function initQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
            quizCompleted = false;
            
            // Show quiz container, hide results
            quizContainer.style.display = 'block';
            resultsContainer.style.display = 'none';
            
            // Load first question
            loadQuestion();
            
            // Update progress bar
            updateProgress();
        }

        // Load a question into the UI
        function loadQuestion() {
            // Get current question
            const currentQuestion = quizQuestions[currentQuestionIndex];
            
            // Update question text and number
            questionText.textContent = currentQuestion.question;
            questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
            questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
            
            // Clear previous options
            optionsContainer.innerHTML = '';
            
            // Create option elements
            currentQuestion.options.forEach((option, index) => {
                // Create option div
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                
                // If user already answered this question, show correct/incorrect
                if (userAnswers[currentQuestionIndex] !== undefined) {
                    if (index === currentQuestion.correctAnswer) {
                        optionElement.classList.add('correct');
                    } else if (userAnswers[currentQuestionIndex] === index && index !== currentQuestion.correctAnswer) {
                        optionElement.classList.add('incorrect');
                    }
                }
                
                // Add selected class if this was the user's answer
                if (userAnswers[currentQuestionIndex] === index) {
                    optionElement.classList.add('selected');
                }
                
                // Set option text
                optionElement.textContent = option;
                
                // Add click event - only if question not answered yet
                if (userAnswers[currentQuestionIndex] === undefined) {
                    optionElement.addEventListener('click', () => selectOption(index));
                }
                
                // Add to container
                optionsContainer.appendChild(optionElement);
            });
            
            // Update next button state
            updateNextButton();
            
            // Update progress bar
            updateProgress();
            
            // Add fade-in animation
            quizContainer.classList.remove('fade-in');
            void quizContainer.offsetWidth; // Trigger reflow
            quizContainer.classList.add('fade-in');
        }

        // Handle option selection
        function selectOption(optionIndex) {
            // Don't allow changing answer after selection
            if (userAnswers[currentQuestionIndex] !== undefined) {
                return;
            }
            
            // Save user's answer
            userAnswers[currentQuestionIndex] = optionIndex;
            
            // Check if answer is correct
            const currentQuestion = quizQuestions[currentQuestionIndex];
            if (optionIndex === currentQuestion.correctAnswer) {
                score++;
            }
            
            // Update UI to show selected option and correct answer
            const options = document.querySelectorAll('.option');
            options.forEach((option, index) => {
                // Remove event listeners to prevent further selection
                option.style.cursor = 'default';
                
                // Show correct answer
                if (index === currentQuestion.correctAnswer) {
                    option.classList.add('correct');
                }
                
                // Show incorrect if user selected wrong answer
                if (index === optionIndex && index !== currentQuestion.correctAnswer) {
                    option.classList.add('incorrect');
                }
                
                // Remove click event
                const newOption = option.cloneNode(true);
                option.parentNode.replaceChild(newOption, option);
            });
            
            // Update next button
            updateNextButton();
        }

        // Update next button state
        function updateNextButton() {
            if (userAnswers[currentQuestionIndex] !== undefined) {
                nextButton.disabled = false;
                
                // Change button text if it's the last question
                if (currentQuestionIndex === quizQuestions.length - 1) {
                    nextButton.textContent = 'See Results';
                } else {
                    nextButton.textContent = 'Next Question';
                }
            } else {
                nextButton.disabled = true;
            }
        }

        // Update progress bar
        function updateProgress() {
            const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }

        // Handle next button click
        function handleNextButton() {
            // Make sure an answer is selected
            if (userAnswers[currentQuestionIndex] === undefined) {
                return;
            }
            
            // If last question, show results
            if (currentQuestionIndex === quizQuestions.length - 1) {
                showResults();
                return;
            }
            
            // Move to next question
            currentQuestionIndex++;
            loadQuestion();
        }

        // Show final results
        function showResults() {
            // Calculate percentage score
            const percentageScore = Math.round((score / quizQuestions.length) * 100);
            
            // Update results UI
            scoreCircle.textContent = `${percentageScore}%`;
            
            // Set feedback based on score
            let feedback = '';
            if (percentageScore >= 90) {
                feedback = 'Excellent! You really know your stuff!';
            } else if (percentageScore >= 70) {
                feedback = 'Good job! You have solid knowledge.';
            } else if (percentageScore >= 50) {
                feedback = 'Not bad! You know the basics.';
            } else {
                feedback = 'Keep studying! You\'ll do better next time.';
            }
            
            feedbackText.textContent = feedback;
            
            // Hide quiz, show results
            quizContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            
            // Add fade-in animation to results
            resultsContainer.classList.remove('fade-in');
            void resultsContainer.offsetWidth; // Trigger reflow
            resultsContainer.classList.add('fade-in');
            
            // Mark quiz as completed
            quizCompleted = true;
        }

        // Event listeners
        nextButton.addEventListener('click', handleNextButton);
        
        restartButton.addEventListener('click', () => {
            initQuiz();
        });

        // Initialize the quiz when page loads
        document.addEventListener('DOMContentLoaded', initQuiz);