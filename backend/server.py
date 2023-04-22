# Import flask and datetime module for showing date and time
from flask import Flask, render_template, request, redirect
import json
import jsonpickle

#ML Imports:
import pandas as pd
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

# Initializing flask app
app = Flask(__name__)\



# Route for seeing data in index
@app.route('/')
def index():
    response_body = {  
    }
    return response_body
    #return render_template('../stroke-prediction/src/index.js')


# Our route for processing user info 
@app.route('/ProcessUserinfo/<string:userinfo>', methods=['POST', 'GET'])
def ProcessUserinfo(userinfo):
    userinfo = json.loads(userinfo)
    print()
    print(userinfo)
    print()

    #ML CODE:
    df = pd.read_csv('healthcare-dataset-stroke-data.csv')
    df.head()

    
    usableInfo=[]
    # As some of the attributes are object(CategoricalData) we will convert it into numeric format
    gender = {'Male': 1,'Female': 2,'Other': 3}
    df.gender = [gender[item] for item in df.gender]

    marriage = {'Yes': 1,'No': 2}
    df.ever_married = [marriage[item] for item in df.ever_married]

    work = {'Private': 1,'Self-employed': 2,'Govt_job': 3, 'children': 4, 'Never_worked': 5}
    df.work_type = [work[item] for item in df.work_type]

    residence = {'Urban': 1,'Rural': 2}
    df.Residence_type = [residence[item] for item in df.Residence_type]

    smoking = {'smokes': 1,'never smoked': 2,'formerly smoked': 3,'Unknown': 4}
    df.smoking_status = [smoking[item] for item in df.smoking_status]

    df['bmi'] = df['bmi'].fillna(df['bmi'].mean())

    # We will drop useless columns for example id
    df=df.drop(df.columns[[0]], axis = 1)


    X = df.iloc[:, 0:10]
    y = df.iloc[:, 10:].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0, shuffle=True)

    y_train = np.array(y_train)
    y_train = y_train.reshape(-1)


    y_test = np.array(y_test)
    y_test = y_test.reshape(-1)

    # KNN
    kn = KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2)
    kn.fit(X_train, y_train)
    predictionKN = kn.predict(X_test)

    # Training and testing set from Decision tree
    dt = DecisionTreeClassifier()
    dt.fit(X_train, y_train)
    predictionDT = dt.predict(X_test)

    # Naive Bayes
    nb = GaussianNB()
    nb.fit(X_train, y_train)
    predictionNB = nb.predict(X_test)

    # Random forest
    rfc = RandomForestClassifier(n_estimators=50, max_depth=15)
    rfc.fit(X_train, y_train)
    predictionRFC = rfc.predict(X_test)


    def ensemble(X):
        predictionKN = kn.predict(X)
        predictionDT = dt.predict(X)
        predictionNB = nb.predict(X)
        predictionRFC = rfc.predict(X)

        ensemble_prediction = np.zeros(len(predictionDT))
        for i in range(len(predictionDT)):
            ensemble_prediction[i] = predictionDT[i]+predictionKN[i] + predictionNB[i]+predictionRFC[i]

        for j in range(len(predictionDT)):
            if ensemble_prediction[j] >= 3:
                ensemble_prediction[j] = 1
            else:
                ensemble_prediction[j] = 0
        return ensemble_prediction



    # On our info
    gender = {'Male': 1,'Female': 2,'Other': 3}
    userinfo[1] = gender[userinfo[1]]

    marriage = {'Yes': 1,'No': 2}
    userinfo[5] = marriage[userinfo[5]]

    work = {'Private': 1,'Self-employed': 2,'Govt-job': 3, 'Children': 4, 'Never worked': 5}
    userinfo[6] = work[userinfo[6]]

    residence = {'Urban': 1,'Rural': 2}
    userinfo[7] = residence[userinfo[7]]

    smoking = {'smokes': 1,'never smoked': 2,'formerly smoked': 3,'Unknown': 4}
    userinfo[10]  = smoking[userinfo[10]]

    
    # Sample Input
    x = [[1,67,0,1,1,1,1,228.69,36.6,3]]
    x = np.array(x)

    #converting to 2d array
    userinfo = np.array(userinfo)
    
    #without name field
    cleanUserInfo=userinfo[1:]
    cleanUserInfo = cleanUserInfo.astype('float64')
    
    cleanUserInfo=np.array(cleanUserInfo)
    cleanUserInfo = [cleanUserInfo]
    print(cleanUserInfo)
    prediction = ensemble(cleanUserInfo)
    
    if(prediction[0] == 0):
        status="No stroke"
    else:
        status="Stroke"
    print(status)


    return jsonpickle.encode(status)


# Running app
if __name__ == '__main__':
	app.run(debug=True)
