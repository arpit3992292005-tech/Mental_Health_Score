Mental Health Score Prediction Using Machine Learning

An end-to-end Machine Learning web application that predicts a user's mental health score using demographic, academic, social media usage, lifestyle, and stress-related features. The project uses Python, Scikit-learn, FastAPI, HTML, CSS, and JavaScript, and is deployed on Render.

Live Demo: https://mental-health-score-1-9c2r.onrender.com

GitHub Repository: https://github.com/arpit3992292005-tech/Mental_Health_Score

Project Overview

The objective of this project is to predict the numerical Mental_Health_Score using relevant user information and lifestyle patterns.

The dataset contains 5,000 records and 13 columns, consisting of 12 input features and one target variable.

Two machine learning algorithms, Linear Regression and Random Forest Regression, were implemented and compared. Based on the evaluation conducted during development, Random Forest Regression delivered better prediction performance and was selected as the preferred model for the application.

The trained model is integrated with a FastAPI backend and an interactive web interface, allowing users to submit input information and receive a predicted mental health score.

Live Application

Try the deployed application:

https://mental-health-score-1-9c2r.onrender.com

Key Features
Predict numerical mental health scores using machine learning.
Train and compare Linear Regression and Random Forest Regression.
Select Random Forest Regression as the best-performing model based on evaluation results.
Process demographic, academic, lifestyle, and social media usage features.
Integrate the trained model with FastAPI.
Provide an interactive frontend using HTML, CSS, and JavaScript.
Deploy the complete application using Render.
Technology Stack
Technology	Purpose
Python	Core programming language
Pandas	Data manipulation and preprocessing
NumPy	Numerical computation
Scikit-learn	Model training and evaluation
Linear Regression	Baseline regression model
Random Forest Regressor	Best-performing prediction model
FastAPI	Backend API development
HTML5	Web page structure
CSS3	Styling and layout
JavaScript	Frontend interactions
Git and GitHub	Version control
Render	Cloud deployment
Dataset Description

The dataset contains 5,000 records and 13 columns. It includes demographic characteristics, academic information, digital platform usage, lifestyle habits, and stress level.

Input Features
Feature	Description	Data Type
Age	Age of the individual	Integer
Gender	Gender category	String / Categorical
Country	Country of the individual	String / Categorical
Academic_Level	Academic or educational level	String / Categorical
Most_Used_Platform	Most frequently used digital platform	String / Categorical
Purpose_Of_Use	Primary purpose of platform usage	String / Categorical
Avg_Daily_Usage_Hours	Average daily platform usage in hours	Float
Daily_Unlocks	Number of daily device unlocks	Integer
Study_Hours	Daily study hours	Float
Physical_Activity_Hours	Physical activity duration in hours	Float
Sleep_Hours_Per_Night	Average nightly sleep duration in hours	Float
Stress_Level	Reported stress level	String / Categorical
Target Variable
Feature	Description	Data Type
Mental_Health_Score	Numerical score the model is trained to predict	Float

The target variable is Mental_Health_Score, making this a supervised regression problem.

Machine Learning Algorithms
1. Linear Regression

Linear Regression was implemented as a baseline model. It estimates the target score by learning a linear relationship between the input features and the mental health score.

2. Random Forest Regression

Random Forest Regression is an ensemble algorithm that combines predictions from multiple decision trees. It can model nonlinear relationships and interactions between input features.

Model Selection

Both models were trained and evaluated during development. Random Forest Regression achieved better prediction performance in the project's evaluation and was selected as the final prediction model.

Machine Learning Workflow
Load the dataset containing 5,000 records.
Inspect the dataset and examine data types and missing values.
Preprocess numerical and categorical features.
Separate the input features from Mental_Health_Score.
Split the data into training and testing sets.
Train the Linear Regression model.
Train the Random Forest Regression model.
Compare model performance using regression metrics.
Select Random Forest Regression based on evaluation results.
Integrate the trained model with FastAPI.
Connect the backend to the frontend.
Deploy the application using Render.
Model Evaluation

The regression models can be evaluated using the following metrics:

Mean Absolute Error (MAE): Measures the average absolute difference between actual and predicted scores.
Mean Squared Error (MSE): Measures the average squared prediction error.
Root Mean Squared Error (RMSE): Measures prediction error on the target scale.
R² Score: Measures how well the model explains variation in the target variable.
Model Comparison
Metric	Linear Regression	Random Forest Regression
MAE	Add actual result	Add actual result
MSE	Add actual result	Add actual result
RMSE	Add actual result	Add actual result
R² Score	Add actual result	Add actual result

Actual evaluation scores should be added from your model evaluation output. Both models should be evaluated on the same test set for a fair comparison.

System Architecture
text
             User Input
                 |
                 v
       Web Application
       HTML, CSS, JavaScript
                 |
                 v
          FastAPI Backend
                 |
                 v
       Input Validation and
          Preprocessing
                 |
                 v
       Trained Random Forest
             Regressor
                 |
                 v
      Predicted Mental Health
               Score
                 |
                 v
       Result on Web Interface

Installation and Setup
Prerequisites
Python
pip
Git
1. Clone the Repository
bash
git clone https://github.com/arpit3992292005-tech/Mental_Health_Score.git
cd Mental_Health_Score

2. Create a Virtual Environment
bash
python -m venv venv


Activate it on Windows:

bash
venv\Scripts\activate


On Linux or macOS:

bash
source venv/bin/activate

3. Install Dependencies
bash
pip install -r requirements.txt

4. Start the FastAPI Server

If the FastAPI instance is named app inside app/main.py, run:

bash
uvicorn app.main:app --reload


Adjust the command to match your actual project entry point.

5. Access the Application

Open the local frontend URL configured by your application.

If API documentation is enabled, visit:

http://127.0.0.1:8000/docs

Deployment

The application is deployed on Render.

Live Application: https://mental-health-score-1-9c2r.onrender.com
Backend Framework: FastAPI
Deployment Platform: Render
Future Improvements
Tune Random Forest hyperparameters to improve generalization.
Compare additional regression algorithms.
Add feature importance analysis to understand which inputs influence predictions.
Improve frontend accessibility and responsiveness.
Add automated tests for the API and prediction pipeline.
Strengthen input validation and error handling.
Monitor model performance on new data.
Responsible Use

This application is intended for educational and research purposes. Its predictions are estimates based on patterns learned from the training data and do not establish clinical validity.

The predicted score should not be used as a medical diagnosis or a substitute for professional mental health assessment. Sensitive personal information should be handled responsibly.

Author

Arpit

GitHub Profile: https://github.com/arpit3992292005-tech
GitHub Repository: https://github.com/arpit3992292005-tech/Mental_Health_Score
Live Demo: https://mental-health-score-1-9c2r.onrender.com
License

Add an appropriate open-source license if you intend to allow others to reuse or distribute the project. Ensure that your dataset permits the intended use.

If you find this project interesting, consider starring the repository.
