import { gql } from "@apollo/client";

export const GET_PROFIL = gql`
  query GetProfil($userId: ID) {
    getProfil(userId: $userId) {
      id
      userId
      fullName
      title
      bio
      avatar
      email
      phone
      address
      city
      postalCode
      country
      linkedin
      github
      website
      socials {
        platform
        url
        icon
      }
      resume
      createdAt
      updatedAt
    }
  }
`;

export const GET_MY_PROFIL = gql`
  query GetMyProfil {
    getMyProfil {
      id
      userId
      fullName
      title
      bio
      avatar
      email
      phone
      address
      city
      postalCode
      country
      linkedin
      github
      website
      socials {
        platform
        url
        icon
      }
      resume
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJETS = gql`
  query GetProjets($userId: ID, $featured: Boolean) {
    getProjets(userId: $userId, featured: $featured) {
      id
      userId
      title
      description
      image
      technologies
      demoUrl
      githubUrl
      category
      featured
      startDate
      endDate
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJET = gql`
  query GetProjet($id: ID!) {
    getProjet(id: $id) {
      id
      userId
      title
      description
      image
      technologies
      demoUrl
      githubUrl
      category
      featured
      startDate
      endDate
      status
    }
  }
`;

export const GET_EXPERIENCES = gql`
  query GetExperiences($userId: ID) {
    getExperiences(userId: $userId) {
      id
      userId
      company
      position
      description
      location
      employmentType
      startDate
      endDate
      isCurrent
      technologies
      createdAt
      updatedAt
    }
  }
`;

export const GET_EXPERIENCE = gql`
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
      id
      userId
      company
      position
      description
      location
      employmentType
      startDate
      endDate
      isCurrent
      technologies
    }
  }
`;

export const GET_COMPETENCES = gql`
  query GetCompetences($userId: ID, $category: CompetenceCategory) {
    getCompetences(userId: $userId, category: $category) {
      id
      userId
      name
      category
      level
      icon
      yearsOfExperience
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_COMPETENCE = gql`
  query GetCompetence($id: ID!) {
    getCompetence(id: $id) {
      id
      userId
      name
      category
      level
      icon
      yearsOfExperience
      description
    }
  }
`;

export const GET_EDUCATIONS = gql`
  query GetEducations($userId: ID) {
    getEducations(userId: $userId) {
      id
      userId
      institution
      degree
      fieldOfStudy
      description
      location
      startDate
      endDate
      isCurrent
      createdAt
      updatedAt
    }
  }
`;

export const GET_EDUCATION = gql`
  query GetEducation($id: ID!) {
    getEducation(id: $id) {
      id
      userId
      institution
      degree
      fieldOfStudy
      description
      location
      startDate
      endDate
      isCurrent
    }
  }
`;

export const GET_PORTFOLIO = gql`
  query GetPortfolio($userId: ID) {
    getPortfolio(userId: $userId) {
      profil {
        id
        fullName
        title
        bio
        avatar
        email
        phone
        address
        city
        postalCode
        country
        linkedin
        github
        website
        socials {
          platform
          url
          icon
        }
        resume
      }
      projets {
        id
        title
        description
        image
        technologies
        demoUrl
        githubUrl
        category
        featured
        status
      }
      experiences {
        id
        company
        position
        description
        location
        employmentType
        startDate
        endDate
        isCurrent
        technologies
      }
      competences {
        id
        name
        category
        level
        icon
        yearsOfExperience
      }
      educations {
        id
        institution
        degree
        fieldOfStudy
        startDate
        endDate
        isCurrent
      }
    }
  }
`;
