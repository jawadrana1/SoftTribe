import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // project image URL
    techStack: { type: [String] }, // e.g. ['React', 'Node', 'MongoDB']
    liveLink: { type: String }, // optional live demo URL
    githubLink: { type: String } // optional code URL
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
