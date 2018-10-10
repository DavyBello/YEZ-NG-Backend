const {
  CandidateTC,
  JobExperienceTC,
  EducationTC,
  CertificateTC,
  CandidateDocumentTC,
  RefereeTC,
  // CaseFileTC,
} = require('../../composers');

CandidateTC.addRelation('experiences', {
  resolver: () => JobExperienceTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('education', {
  resolver: () => EducationTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('certificates', {
  resolver: () => CertificateTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('referees', {
  resolver: () => RefereeTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addRelation('documents', {
  resolver: () => CandidateDocumentTC.getResolver('findMany'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
// CandidateTC.addRelation('caseFiles', {
//   resolver: () => CaseFileTC.getResolver('findMany'),
//   prepareArgs: {
//     filter: source => ({ candidateId: source._id }),
//   },
//   projection: { _id: true },
// });
CandidateTC.addRelation('documentsPagination', {
  resolver: () => CandidateDocumentTC.getResolver('pagination'),
  prepareArgs: {
    filter: source => ({ candidateId: source._id }),
  },
  projection: { _id: true },
});
CandidateTC.addFields({
  isBasicProfileComplete: require('./isBasicProfileComplete'),
  profilePercentage: require('./profilePercentage'),
});
