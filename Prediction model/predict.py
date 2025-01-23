import sys
import joblib
import pandas as pd

# Load the pre-trained models and encoder
rf_model = joblib.load("E:/Mr.Gadgets backup/Desktop/Fast-NU/FYP/CareOnix/backend/rf_model.pkl")  # Random Forest model
linear_model = joblib.load("E:/Mr.Gadgets backup/Desktop/Fast-NU/FYP/CareOnix/backend/linear_model.pkl")  # Linear Regression model
encoder = joblib.load("E:/Mr.Gadgets backup/Desktop/Fast-NU/FYP/CareOnix/backend/encoder.pkl")  # Pre-trained LabelEncoder

# Define the minimum year used during training
min_year = 2010  # Replace with the actual min year from your dataset

# Get input from command-line arguments
city = sys.argv[1]
year = int(sys.argv[2])
month = int(sys.argv[3])

# Calculate Year_Trend
year_trend = year - min_year

# Encode the city
try:
    city_encoded = encoder.transform([city])[0]
except ValueError:
    print(f"Error: The city '{city}' is not recognized. Please ensure the city is in the training dataset.")
    sys.exit(1)

# Prepare the input data for prediction
input_data = pd.DataFrame({
    "City": [city_encoded],
    "Year": [year],
    "Year_Trend": [year_trend],
    "Month": [month]
})

# Predict with Random Forest model
rf_prediction = rf_model.predict(input_data)

# Predict with Linear Regression model for trend adjustment
linear_prediction = linear_model.predict(input_data[["Year_Trend"]])

# Combine predictions (adjusting with trend)
final_prediction = rf_prediction + linear_prediction * 0.1  # Adjust with trend

# Output the predicted donation
print(int(round(final_prediction[0])))  # Round and convert to integer
