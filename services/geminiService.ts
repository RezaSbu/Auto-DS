import { GoogleGenAI, Type } from "@google/genai";
import { DatasetInfo, GeneratedResult } from "../types";

const MASTER_ROADMAP = `
🗺️ نقشه راه جامع ۰ تا ۱۰۰ پروژه‌های Data Science / Machine Learning

مرحله 0 – فهم مسئله
نوع پروژه: Regression / Classification / Clustering / Unsupervised Analysis / Forecasting / Recommendation / Anomaly Detection
سوالات کلیدی: هدف نهایی چیست؟ (Predict, Classify, Cluster, Analyze, Forecast) نوع داده‌ها چیست؟ (Numeric, Categorical, Text, Time-Series, Image, Graph) معیار موفقیت چیست؟ (Accuracy, R², RMSE, F1-score, ROC-AUC, Silhouette, Profit, KPI…) محدودیت‌ها: latency، interpretability، storage، privacy
تصمیم‌گیری رزومه‌ای: نوع پروژه مشخص → تعیین preprocessing و pipeline اولیه تعداد feature‌ها، نوع داده‌ها → انتخاب الگوریتم‌های مناسب

مرحله 1 – جمع‌آوری داده (Data Collection / Acquisition)
منابع داده: CSV, Excel, Database, API, Web Scraping, IoT / Sensor, Images, Text, Graph Data
ادغام داده‌ها: merge, join, concat, append
مستندسازی منبع و نوع داده‌ها
تصمیم‌گیری: چند dataset داریم؟ → merge / join داده ناقص یا پراکنده؟ → cleaning لازم است

مرحله 2 – بررسی اولیه داده‌ها (Exploratory Data Analysis / EDA)
Basic EDA: df.head(), df.info(), df.describe(), df.isna().sum()
Visualization: Histogram, Boxplot, Violin plot, Countplot Scatter plot, Pairplot Heatmap correlation, Cluster map
Feature types: Numeric, Categorical, Ordinal, Binary, Text, Datetime, Image
تصمیم‌گیری: بررسی imbalance در classification بررسی skew / outlier در numeric features نیاز به feature engineering و transformation

مرحله 3 – تمیزسازی داده (Data Cleaning / Preprocessing)
3.1 Handling Missing Values: Drop row/column Imputation: mean, median, mode, KNN imputer, Iterative imputer, MICE Interpolation (linear, spline) برای سری‌های زمانی Advanced: predictive imputation (RandomForest, regression)
3.2 Handling Outliers: IQR, Z-score, Modified Z-score LOF, ABOD, Isolation Forest Decision: حذف، cap, transformation, robust model
3.3 Categorical Encoding: One-Hot Encoding Label / Ordinal Encoding Target / Mean Encoding Frequency / Count Encoding Embedding (Neural Networks) Hashing Encoding (High-cardinality features)
3.4 Scaling / Normalization: StandardScaler (mean=0, std=1) MinMaxScaler (0-1) RobustScaler (median, IQR) MaxAbsScaler Log / Box-Cox / Yeo-Johnson (skewed data)
3.5 Text & Date Processing: Text: Tokenization, Stemming, Lemmatization, TF-IDF, Word2Vec, BERT embeddings Date/Time: Extract day, month, year, weekday, hour, cyclical features (sin/cos)
3.6 Feature Engineering: Interaction terms: x1*x2, x1/x2 Polynomial features Binning / discretization Aggregation / rolling statistics Domain-specific transformations
تصمیم‌گیری: مدل خطی یا فاصله‌ای؟ → scaling و transformation لازم Tree-based؟ → scaling کم اهمیت

مرحله 4 – تحلیل آماری و تست‌های فرضیه
Normality: Shapiro-Wilk, D’Agostino, Kolmogorov-Smirnov, Q-Q plot
Two-group comparison: T-test, Mann-Whitney U
Multi-group comparison: ANOVA, Kruskal-Wallis
Categorical dependency: Chi-Square test, Fisher Exact
Correlation: Pearson (linear & normal), Spearman (rank), Kendall Tau
Variance analysis: Levene test, Bartlett test
Feature importance: Mutual information, f_classif, f_regression
تصمیم‌گیری: Numeric & normal → parametric tests Skewed / ordinal → non-parametric tests

مرحله 5 – Visualization پیشرفته
Pairplots / Scatter matrix
Heatmaps / Cluster maps
PCA / t-SNE / UMAP (dimension reduction & visualization)
Boxplot / Violin plot per group
Feature importance plots
Residual plots (Regression)
Confusion Matrix & ROC curves (Classification)
Silhouette plots (Clustering)
تصمیم‌گیری: تعداد feature زیاد → PCA / t-SNE visualization Classification → confusion matrix Regression → residual plots

مرحله 6 – آماده‌سازی داده برای مدلینگ
Train/Test Split (stratified for classification)
Cross-validation / K-Fold / Stratified K-Fold / TimeSeriesSplit
Feature selection: Filter methods: correlation threshold, ANOVA F-value, mutual info Wrapper methods: RFE, sequential feature selection Embedded: Lasso, Tree-based feature importance

مرحله 7 – انتخاب مدل
Regression: Linear, Ridge, Lasso, ElasticNet Polynomial regression Decision Tree / RandomForest / XGBoost / LightGBM / CatBoost Neural Networks (MLP, CNN for time series)
Classification: Logistic Regression, SVM, KNN Tree-based: Decision Tree, RandomForest, XGBoost, LightGBM, CatBoost Neural Networks: MLP, CNN, RNN, Transformers Probabilistic: Naive Bayes
Clustering / Unsupervised: KMeans, KMedoids, Hierarchical, DBSCAN, HDBSCAN
Dimensionality reduction: PCA, t-SNE, UMAP
Anomaly Detection: LOF, Isolation Forest, One-Class SVM, Autoencoder
Baseline Model: Simple model as reference → mean, median, dummy classifier

مرحله 8 – آموزش و ارزیابی مدل
Train / Fit model
Metrics: Regression: R², MSE, RMSE, MAE, MAPE Classification: Accuracy, Precision, Recall, F1-score, ROC-AUC, LogLoss Clustering: Silhouette, Davies-Bouldin, Calinski-Harabasz Ranking/Recommendation: NDCG, MAP, Precision@k
Cross-validation / Hyperparameter tuning: GridSearchCV, RandomizedSearchCV, Bayesian Optimization
Regularization: L1, L2, ElasticNet
Ensemble methods: Bagging, Boosting, Stacking, Voting

مرحله 9 – تحلیل خطا و residual
Regression: residual plots, heteroscedasticity check
Classification: confusion matrix, misclassified samples
Feature importance / SHAP / LIME / PDP
Learning curves: bias-variance trade-off

مرحله 10 – بهبود مدل
Feature engineering / selection
Transformation on features/target
Handling imbalance: SMOTE, undersampling, class weights
Ensemble / Stacking / Bagging / Boosting
Neural network tuning: learning rate, layers, batch size, dropout

مرحله 11 – مستندسازی و Reporting
توضیح مراحل، تصمیم‌ها، نمودارها
جدول مقایسه مدل‌ها و metrics
Interpretation / recommendation
آماده‌سازی برای presentation یا رزومه

مرحله 12 – Deployment / Production
Pipeline: preprocessing + model
Serialization: pickle / joblib / ONNX
API / Web app / Streamlit / FastAPI
Monitoring model drift / retraining strategy
`;

export const analyzeAndGenerate = async (
  dataset: DatasetInfo,
  userPrompt: string
): Promise<GeneratedResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const dataContext = `
    Dataset Filename: ${dataset.filename}
    Columns: ${dataset.columns.join(", ")}
    Column Types: ${JSON.stringify(dataset.columnTypes)}
    First 3 rows sample: ${JSON.stringify(dataset.preview.slice(0, 3))}
  `;

  const systemInstruction = `
    You are an expert Senior Data Scientist named "AutoDS". 
    Your goal is to build a HIGHLY CUSTOMIZED execution plan based on the "MASTER_ROADMAP" provided below.
    
    CRITICAL INSTRUCTIONS:
    1.  **Analyze** the user's goal and dataset strictly.
    2.  **Select** relevant steps from the MASTER_ROADMAP. You must NOT just summarize; you must pick specific techniques mentioned (e.g., if it's imbalanced classification, explicitly select SMOTE from Stage 10 and Stratified K-Fold from Stage 6).
    3.  **Map** the roadmap: Your output JSON "roadmap" must follow the logical flow of the MASTER_ROADMAP but only include what is necessary for this specific project.
    4.  **Python Code**: Generate a robust, production-grade Python script (pandas, sklearn, matplotlib, seaborn).
    
    MASTER_ROADMAP:
    ${MASTER_ROADMAP}
  `;

  const prompt = `
    User Project Goal: "${userPrompt}"
    
    Dataset Info:
    ${dataContext}

    Task:
    1. Create a Custom Roadmap JSON: Select specific methods from the Master Roadmap.
    2. Write Python Code: Implement the selected roadmap. Ensure to handle missing values, encoding, and scaling based on the column types provided.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", 
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysisSummary: { type: Type.STRING, description: "A comprehensive summary of the strategy in Persian." },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stage: { type: Type.STRING },
                description: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                algorithms: { type: Type.ARRAY, items: { type: Type.STRING } },
                reasoning: { type: Type.STRING }
              }
            }
          },
          pythonCode: { type: Type.STRING, description: "The complete Python code." }
        }
      }
    },
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(text) as GeneratedResult;
};