// DELETE WHEN DONE TESTING
import React, { useEffect } from 'react';

const Testing = ({ setLaws }) => {
  useEffect(() => {
    // Dummy data for testing purposes
    const dummyData = [
        {
            lawId: 1,
            lawTitle: 'Sample Law 1',
            lawDescription: 'This is a sample law description for law 1.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 1.' },
                  { content: 'Section 2 content for law 1.' },
                ],
              },
            ],
          },
          {
            lawId: 2,
            lawTitle: 'Sample Law 2',
            lawDescription: 'This is a sample law description for law 2.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
              {
                headingTitle: 'Sample Heading 2',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
            ],
          },
          {
            lawId: 3,
            lawTitle: 'Sample Law 3',
            lawDescription: 'This is a sample law description for law 1.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 1.' },
                  { content: 'Section 2 content for law 1.' },
                ],
              },
            ],
          },
          {
            lawId: 4,
            lawTitle: 'Sample Law 4',
            lawDescription: 'This is a sample law description for law 2.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
              {
                headingTitle: 'Sample Heading 2',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
            ],
        },
        {
            lawId: 5,
            lawTitle: 'Sample Law 5',
            lawDescription: 'This is a sample law description for law 11.',
            headings: [
            {
                headingTitle: 'Sample Heading 1',
                sections: [
                { content: 'Section 1 content for law 11.' },
                { content: 'Section 2 content for law 11.' },
                ],
            },
            ],
        },
        {
            lawId: 6,
            lawTitle: 'Sample Law 6',
            lawDescription: 'This is a sample law description for law 1.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 1.' },
                  { content: 'Section 2 content for law 1.' },
                ],
              },
            ],
          },
          {
            lawId: 7,
            lawTitle: 'Sample Law 7',
            lawDescription: 'This is a sample law description for law 2.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
              {
                headingTitle: 'Sample Heading 2',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
            ],
          },
          {
            lawId: 8,
            lawTitle: 'Sample Law 8',
            lawDescription: 'This is a sample law description for law 1.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 1.' },
                  { content: 'Section 2 content for law 1.' },
                ],
              },
            ],
          },
          {
            lawId: 9,
            lawTitle: 'Sample Law 9',
            lawDescription: 'This is a sample law description for law 2.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
              {
                headingTitle: 'Sample Heading 2',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
            ],
        },
        {
            lawId: 10,
            lawTitle: 'Sample Law 10',
            lawDescription: 'This is a sample law description for law 11.',
            headings: [
            {
                headingTitle: 'Sample Heading 1',
                sections: [
                { content: 'Section 1 content for law 11.' },
                { content: 'Section 2 content for law 11.' },
                ],
            },
            ],
        },
        {
            lawId: 11,
            lawTitle: 'Sample Law 11',
            lawDescription: 'This is a sample law description for law 1.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 1.' },
                  { content: 'Section 2 content for law 1.' },
                ],
              },
            ],
          },
          {
            lawId: 12,
            lawTitle: 'Sample Law 12',
            lawDescription: 'This is a sample law description for law 2.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
              {
                headingTitle: 'Sample Heading 2',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
            ],
          },
          {
            lawId: 13,
            lawTitle: 'Sample Law 13',
            lawDescription: 'This is a sample law description for law 1.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 1.' },
                  { content: 'Section 2 content for law 1.' },
                ],
              },
            ],
          },
          {
            lawId: 14,
            lawTitle: 'Sample Law 14',
            lawDescription: 'This is a sample law description for law 2.',
            headings: [
              {
                headingTitle: 'Sample Heading 1',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
              {
                headingTitle: 'Sample Heading 2',
                sections: [
                  { content: 'Section 1 content for law 2.' },
                  { content: 'Section 2 content for law 2.' },
                ],
              },
            ],
        },
        {
            lawId: 15,
            lawTitle: 'Sample Law 15',
            lawDescription: 'This is a sample law description for law 11.',
            headings: [
            {
                headingTitle: 'Sample Heading 1',
                sections: [
                { content: 'Section 1 content for law 11.' },
                { content: 'Section 2 content for law 11.' },
                ],
            },
            ],
        },
    ];

    setLaws(dummyData);
  }, [setLaws]);

  return null;
};

export default Testing;