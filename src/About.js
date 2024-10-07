import React from "react";

function About() {
  return (
    <div className="min-h-screen p-6 flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        About Writers Padi
      </h1>
      <p className="max-w-xl text-lg text-gray-700 mb-6">
        <strong>Writers Padi</strong> is a versatile application developed by{" "}
        <strong>Alatechdigitals</strong> that empowers writers to create and
        manage their content effortlessly. Designed with writers in mind,
        Writers Padi provides features that allow users to:
      </p>
      <ul className="list-disc list-inside text-left max-w-xl text-gray-700 mb-6">
        <li>Write and edit content seamlessly</li>
        <li>Monitor word count in real-time</li>
        <li>Keep track of edits and revisions</li>
      </ul>
      <p className="max-w-xl text-lg text-gray-700 mb-6">
        Whether you are working on an article, story, or any form of content,
        Writers Padi ensures that you have all the tools needed to make your
        writing process smooth and productive.
      </p>
    </div>
  );
}

export default About;
