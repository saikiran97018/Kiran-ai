import axios from 'axios';
import dotenv from 'dotenv'
const API_KEY = import.meta.API_KEY ||'AIzaSyBChtpfxdTTuHGV_UY1-i6EpBhC03-1K1M';
const API_URL =     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function generateResponse(queryType, branch, semester, userInput) {
  try {
    const timestamp = new Date().getTime();
    const prompt = `You are an AI tutor for a ${branch} engineering student in ${semester} semester. 
      Request: '${userInput}'. Feature: '${queryType}'. Timestamp: ${timestamp}. 
      Generate a unique, tailored response specific to this input: 
      - Study Plan: A 7-day plan with topic, explanation (1-2 sentences), video (e.g., 'YouTube: freeCodeCamp - [topic]'), and problem. 
      Format each day as: 'Day X: Topic - [t], Explanation - [e], Video - [v], Problem - [p]'.
      - Project Idea: A project with name, description (1-2 sentences), 3 steps, and 1 resource. 
      Format as: 'Name: [n]\\nDescription: [d]\\nSteps: 1) [s1], 2) [s2], 3) [s3]\\nResource: [r]'.
      - Code Help: Identify the error in the code, explain it (1-2 sentences), suggest a fix, and provide an example. 
      Format as: 'Error: [e]\\nExplanation: [exp]\\nFix: [f]\\nCorrected Example: [ex]'.
      - Career Prep: 2 unique interview questions with answers and 1 tip, tailored to the goal. 
      Format as: 'Q1: [q1], A1: [a1], Q2: [q2], A2: [a2], Tip: [t]'.
      Ensure the response is specific to ${branch} and '${userInput}'.`;

    const response = await axios.post(
      API_URL,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to generate response');
  }
}