const dev = 
{    
    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-2-api-dev-attachmentsbucket-18o45zd8n9gio"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://dx19xql2sf.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_eFTT2fT4l",
        APP_CLIENT_ID: "1jqdht2fgf14v4h748kmtf5fmg",
        IDENTITY_POOL_ID: "us-east-2:d4de9426-2f0c-47b2-89e7-a2f57cde116d"
    }
};

const prod = 
{
    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-2-api-prod-attachmentsbucket-rx0rgz4blykj"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://7f5bxp40ol.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_ihl0u86C5",
        APP_CLIENT_ID: "4t3gm4qevpoh3dct2mbf5p8dj",
        IDENTITY_POOL_ID: "us-east-2:54fd253c-7afd-4fb4-a254-a21bb3f02f69"
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};