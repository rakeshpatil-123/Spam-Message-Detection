import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import pickle

# Load the dataset
data = pd.read_csv('dataset/spam.csv', encoding='latin-1')
data = data[['v1', 'v2']]
data.columns = ['label', 'message']

# Map labels to binary values
data['label'] = data['label'].map({'ham': 0, 'spam': 1})

# Train-Test Split
X = data['message']
y = data['label']

# Build the model pipeline
model = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('classifier', MultinomialNB())
])

# Train the model
model.fit(X, y)

# Save the model
with open('model/spam_model.pkl', 'wb') as file:
    pickle.dump(model, file)

print("Model trained and saved successfully.")
