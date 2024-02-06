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
        title:"Goal Setting:", 
        link: "https://youtu.be/jJddYjx_Bq0", 
        desc: "Goals are an essential part of life because they help one have a purpose in life, motivating us to do things we once never thought possible. In this video, we'll be discussing the best practices for goal-setting so that you can go about creating a path forward for your life."
    },{
        imgRef: "https://i.imgur.com/sDi46q9.png",
        title:"Financial Literacy Part 1:", 
        link: "https://www.youtube.com/watch?v=vsYZ_xRbjpA", 
        desc: "Financial literacy refers to the ability to understand and effectively manage personal finances. In the video, we'll be explaining what exactly is financial literacy and how you can utilize it to plan for the future and be able to achieve your financial goals."
    },{
        imgRef: "https://imgur.com/undefined",
        title:"How to Open Use an EBT Card:",
        link: "https://youtu.be/dqGjXrX0eVY",
        desc: "In this video we will go over what an EBT card is, the benefits from getting it, and the steps to obtain one yourself."
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
    },{
        imgRef: "https://i.imgur.com/eBtMV97.png",
        title: "Interviewing",
        link: "https://youtu.be/23H1zJRauqc",
        desc: "In this video, we'll go over interviewing and offer essential tips on preparation, body language, and effective communication to get you ready for your interview. "
    },{
        imgRef: "https://i.imgur.com/QxhFwYS.png",
        title: "Networking",
        link: "https://youtu.be/7a3xOZAWgfo",
        desc: "In this video, we'll go over networking, where we will go over on how to establish relationships with individuals for personal or professional purposes. In a professional context, networking involves connecting with others in your industry to share information, opportunities, and resources."
    },{
        imgRef: "https://i.imgur.com/QxhFwYS.png",
        title: "Resume Building",
        link: "https://youtu.be/tcEwtkqjQq8",
        desc: "In this video, we'll go over resume building to ensure you have a compelling resume that is properly formatted. We will cover all the key elements such as the formatting, and the appropriate content necessary to highlight your education, work experience, skills, and achievements."
    }]
  }
  