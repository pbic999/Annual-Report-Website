import saveAs from 'file-saver'
import fetchData from "../Components/axios";

import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
} from "docx";

const Generate = (doc) => {
    Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
}

function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
    }, {});
}

const deptArray = ['Chemical', 'Chemistry', 'Civil and Environmental', 'Electrical',
    'Computer Science', 'Humanities and Social Sciences', 'Mathematics and Statistics',
    'Mechanical', 'Physics']

const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]

const publicationSections = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name}, ${y.other_authors}. "${y.title}" ${y.journal_name}, ${y.volume ? `vol. ${y.volume}, ` : ''}${y.issue ? `no. ${y.issue}, ` : ''}${new Date(y.timestamp).getFullYear()}, pp. ${y.pp} \n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}

const awardSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name}, ${y.award_name}. "${y.award_by}" ${y.award_for}, ${new Date(y.timestamp).getDate()} ${months[new Date(y.timestamp).getMonth()]} ${new Date(y.timestamp).getFullYear()}\n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}

const projectSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  "${y.title}", funded by ${y.funding_from}, Amount Sanctioned - Rs. ${y.sanctioned_amount}, ${months[new Date(y.start_date).getMonth()]} ${new Date(y.start_date).getFullYear()}-${months[new Date(y.end_date).getMonth()]} ${new Date(y.end_date).getFullYear()} \n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}

const conferenceProceedingsSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            const start = new Date(y.start_date)
            const end = new Date (y.end_date)
            const dateText = start.getMonth() === end.getMonth() ? `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}` :
            start.getFullYear() === end.getFullYear() ? `${start.getDate()} ${months[start.getMonth()]}-${end.getDate()} ${months[end.getMonth()]} ${start.getFullYear()}` :
            `${start.getDate()} ${months[start.getMonth()]} ${months[start.getFullYear()]}-${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name}, ${y.other_authors}. ${y.paper_title} "${y.title}" ${y.proceeding_name}, ${y.venue}, ${dateText}, ${y.volume ?`vol. ${y.volume}` : ''}, ${y.issue ?`vol. ${y.issue}` : ''} pp. ${y.pp} \n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr 
}


const conferenceAttendedSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            const start = new Date(y.start_date)
            const end = new Date (y.end_date)
            const dateText = start.getMonth() === end.getMonth() ? `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}` :
            start.getFullYear() === end.getFullYear() ? `${start.getDate()} ${months[start.getMonth()]}-${end.getDate()} ${months[end.getMonth()]} ${start.getFullYear()}` :
            `${start.getDate()} ${months[start.getMonth()]} ${months[start.getFullYear()]}-${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name} "${y.title}" ${y.venue}, ${dateText}\n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr 
}


const booksSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name}: "${y.other_authors}." ${y.chapter_no ? `Chapter ${y.chapter_no} - ${y.chapter_title}` : ''} ${y.book_title}, ${y.publisher} ${new Date(y.timestamp).getFullYear()}  ${y.pp}\n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}


const lectureSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name}: "${y.topic}." ${y.institute}, ${new Date(y.timestamp).getDate()} ${months[new Date(y.timestamp).getMonth()]} ${new Date(y.timestamp).getFullYear()}\n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}

const abroadVisitSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            const start = new Date(y.start_date)
    const end = new Date (y.end_date)
    const dateText = start.getMonth() === end.getMonth() ? `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}` :
            start.getFullYear() === end.getFullYear() ? `${start.getDate()} ${months[start.getMonth()]}-${end.getDate()} ${months[end.getMonth()]} ${start.getFullYear()}` :
            `${start.getDate()} ${months[start.getMonth()]} ${months[start.getFullYear()]}-${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name}, ${y.purpose}, ${y.venue}, ${dateText}, ${y.funding_from}.\n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}

const fellowshipSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.fellowship_name}, ${y.fellowship_academics}. ${new Date(y.timestamp).getFullYear()} \n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}


const visitorSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name}, ${y.designation}, ${y.institute} ${new Date(y.timestamp).getDate()} ${months[new Date(y.timestamp).getMonth()]}, ${new Date(y.timestamp).getFullYear()}, ${y.purpose}, ${y.topic}\n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr
}


const conferenceOrganizedSection = (object) => {
    let parr = []
    Object.entries(object).map(x => {
        parr.push(
            new Paragraph({
                text: `\n`,
            })
        )
        parr.push(new Paragraph({
            text: `${deptArray[x[0]]}\n`,
            heading: HeadingLevel.HEADING_3
        }))
        x[1].map((y, index) => {
            const start = new Date(y.start_date)
            const end = new Date (y.end_date)
            const dateText = start.getMonth() === end.getMonth() ? `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}` :
            start.getFullYear() === end.getFullYear() ? `${start.getDate()} ${months[start.getMonth()]}-${end.getDate()} ${months[end.getMonth()]} ${start.getFullYear()}` :
            `${start.getDate()} ${months[start.getMonth()]} ${months[start.getFullYear()]}-${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`
            parr.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${index + 1}.  ${y.name} "${y.title}" ${y.venue}, ${dateText} ${y.funding_from}\n`,
                            color: '#000000'
                        })
                    ]
                })

            )

        })
    })
    return parr 
}




const GenerateDocx = (dates) => {
    let publications = []
    let books = []
    let conferenceProceedings = []
    let special_lecture = []
    let projects = []
    let fellowships = []
    let abroadVisit = []
    let awards = []
    let conference_attended = []
    let conference_organized = []
    let visitors = []
    const startTimestamp = dates.start
    const endTimestamp = dates.end
    dates.updateLoading(true)
    fetchData.get(`user/get/data/publications/${startTimestamp}/${endTimestamp}`).then((res) => {
        publications = groupBy(res.data, 'sorting_no')
        fetchData.get(`user/get/data/books/${startTimestamp}/${endTimestamp}`).then((res) => {
            books = groupBy(res.data, 'sorting_no')
            fetchData.get(`user/get/data/conference_presentation/${startTimestamp}/${endTimestamp}`).then((res => {
                conferenceProceedings = groupBy(res.data, 'sorting_no')
                fetchData.get(`user/get/data/special_lecture/${startTimestamp}/${endTimestamp}`).then((res) => {
                    special_lecture = groupBy(res.data, 'sorting_no')
                    fetchData.get(`user/get/data/projects/${startTimestamp}/${endTimestamp}`).then((res) => {
                        projects = groupBy(res.data, 'sorting_no')
                        fetchData.get(`user/get/data/fellowship/${startTimestamp}/${endTimestamp}`).then(res => {
                            fellowships = groupBy(res.data, 'sorting_no')
                            fetchData.get(`user/get/data/abroad_visit/${startTimestamp}/${endTimestamp}`).then(res => {
                                abroadVisit = groupBy(res.data, 'sorting_no')
                                fetchData.get(`user/get/data/award_and_honours/${startTimestamp}/${endTimestamp}`).then(res => {
                                    awards = groupBy(res.data, 'sorting_no')
                                    fetchData.get(`user/get/data/conference_attended/${startTimestamp}/${endTimestamp}`).then(res => {
                                        conference_attended = groupBy(res.data, 'sorting_no')
                                        fetchData.get(`user/get/data/conference_organized/${startTimestamp}/${endTimestamp}`).then(res => {
                                            conference_organized = groupBy(res.data, 'sorting_no')
                                            fetchData.get(`user/get/data/visitor_to_department/${startTimestamp}/${endTimestamp}`).then(res => {
                                                visitors = groupBy(res.data, 'sorting_no')
                                                const doc = new Document({
                                                    sections: [
                                                        {
                                                            children: [
                                                                new Paragraph({
                                                                    text: 'Annual Report',
                                                                    heading: HeadingLevel.HEADING_1
                                                                }),
                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Publications\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...publicationSections(publications),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Special Lectures\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...lectureSection(special_lecture),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Projects\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...projectSection(projects),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Conference Proceedings/Presentations\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...conferenceProceedingsSection(conferenceProceedings),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Conference Attended\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...conferenceAttendedSection(conference_attended),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Conference Organized\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...conferenceOrganizedSection(conference_organized),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Books\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...booksSection(projects),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Awards and Honours\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...awardSection(awards),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Abroad Visit\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...abroadVisitSection(abroadVisit),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Fellowships\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...fellowshipSection(fellowships),

                                                                new Paragraph({
                                                                    text:'\n'
                                                                }),
                                                                new Paragraph({
                                                                    text: `Visitors to Department\n`,
                                                                    heading: HeadingLevel.HEADING_2,
                                                                }),
                                                                ...visitorSection(visitors),
                                                            ]
                                                        }
                                                    ]
                                                },
                                                )
                                                Generate(doc)
                                                dates.updateLoading(false)
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }))
        })
    }).catch((err) => {
    })

}

export default GenerateDocx