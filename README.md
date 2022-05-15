# Estudio de la calidad del aire en Madrid
 
Este repositorio de GitHub contiene el código del Trabajo de Fin de Máster del máster de Ciencia de Datos de la Universitat Oberta de Catalunya. Consiste en un análisis de la calidad del aire en la ciudad de Madrid durante los últimos 20 años, analizando los agentes contaminantes más relevantes en la ciudad: dióxido de azufre, dióxido de nitrógeno, particulas PM10, partículas PM2.5 y ozono troposférico. El estudio contiene un análisis geográfico de estos datos a través de imágenes obtenidas por interpolación con los datos de calidad del aire recogidos por las distintas estaciones de control de la red de vigilancia del Ayuntamiento de Madrid. Además, se estudia también la relación de estos agentes contaminantes con las condiciones climatológicas, a través de los datos recogidos por las estaciones meteorológicas desde el año 2019. La última parte del proyecto se centra en la búsqueda de modelos de predicción a través de técnicas de aprendizaje automático; en concreto, se ha generado modelos de predicción utilizando dos algoritmos: random forest y SVM.

## Ficheros Rmd

El estudio se ha realizado prinicpalmente con R y se encuentra recogido en tres ficheros Rmd que se encuentran en el directorio principal del repositorio:

- Aire.Rmd: Este fichero contiene todo el código R para el análisis de los datos de calidad del aire de los últimos 20 años. Además, genera un dataset (datos_horarios_aire.csv) necesario para el correcto funcionamiento de los otros scripts.

- Meteo.Rmd: Este fichero contiene el análisis de los datos meteorológicos. Es necesario el fichero datos_horarios_aire.csv generado con el código contenido en el fichero Aire.Rmd. Genera un dataset (datos_horarios_meteo.csv) necesario para la generación de modelos.

- Modelos.Rmd: Este fichero contiene el código para los modelos de predicción con random forest y SVM. Es necesario haber creado previamente los ficheros datos_horarios_aire.csv y datos_horarios_meteo.csv previamente.

## Proyecto QGIS

El fichero MADRID.qgz contiene el proyecto QGIS con el análisis geográficos de los datos de calidad del aire. El proyecto contiene las siguientes capas:

- Mapa base de Madrid
- Distritos
- Zona de Bajas Emisiones Madrid Centro
- Capas de interpolación de los últimos 4 años para los 5 contaminantes estudiados
- Capas de interpolación para los periodos previos al confinamiento de 2020 y durante el confinamiento de 2020 para los 5 contaminantes estudiados

## Carpetas

A continuación, se detalla el contenido de las carpetas del repositorio:

- Barrios: Shapefile de los barrios de Madrid
- Datos horarios: Datos horarios de calidad del aire de Madrid desde el año 2001. Los datos están divididos por meses. Dentro de esta carpeta hay una carpeta por cada uno de los años que contiene los 12 ficheros csv, uno por cada mes, con la información utilizada.
- Datos horarios meteo: Datos horarios meteorológicos de Madrid desde 2019. Los datos están divididos por meses. Dentro de esta carpeta se encuentran los ficheros csv que correponden cada uno a un año y mes específico.
- Distritos: Shapefile de los distritos de Madrid.
- Estaciones: Información de las estaciones de control de calidad del aire. Fichero csv.
- Estaciones meteo: Información de las estaciones meteorológicas. Fichero csv.
- Gráficas: Imágenes de las gráficas y mapas generados para la memoria del TFM.
- Layers: Capas de interpolación generadas a través de QGIS. Están guardadas en formato geotiff.
- ZBEDEP Distrito Centro: Shapefile de la zona de bajas emisiones distrito centro de Madrid.