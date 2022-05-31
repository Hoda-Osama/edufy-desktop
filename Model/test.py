import os,cv2
import numpy as np
import keras
from keras.optimizers import *
names = ['anger','contempt','disgust','fear','happy','sadness','surprise']
model = keras.models.load_model('Model/model_keras.h5')
img = cv2.imread('istockphoto-175174559-1024x1024.jpg')
img_resize = cv2.resize(img, (48, 48))
img = (np.expand_dims(img_resize,0))
pred = model.predict(img)
print("prediction is ", pred)
classes_x=np.argmax(pred,axis=1)
print("classes", classes_x)
classn= int(classes_x)
print("class is ", names[classn])
