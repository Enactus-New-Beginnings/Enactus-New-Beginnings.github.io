/**
 * An object which maps string (video category) to array (video metadata)
 * @module VideoData
 */
module.exports={
    /**
    * @typedef VideoMetaData
     * @type {object}
     * @property {string} imgRef URL of video thumbnail image
     * @property {string} title Title of video
     * @property {string} link URL of actual video
     * @property {string} desc A short description of the video
     */
    /**
     * Array of video objects to be displayed in the "finance" tab
     * @type {VideoMetaData[]}
     */
    "finance": [{
        imgRef: "https://i.ytimg.com/vi/jJddYjx_Bq0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAl9b4bNs0VKwbSnDdrwi3nV8596Q", 
        title:"Goal Setting", 
        link: "https://youtu.be/jJddYjx_Bq0", 
        desc: "Goals are an essential part of life because they help one have a purpose in life, motivating us to do things we once never thought possible. In this video, we'll be discussing the best practices for goal-setting so that you can go about creating a path forward for your life."
    }],
    /**
     * Array of video objects to be displayed in the "career" tab
     * @type {VideoMetaData[]}
     */
    "career": [{
        imgRef:"https://i.ytimg.com/vi/cTf1vRTVMbQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBBArAfSPDCv3xeN7OdC83mOEcUqQ", 
        title: "Finding the Right Career", 
        link: "https://youtu.be/cTf1vRTVMbQ", 
        desc: "Today, we’re going to be talking about how you can find the right career! We discuss how to analyze your strength, \"find who you are\", and ultimately search for employment."
    }]
  }
  