import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        role
      }
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const CREATE_PROFIL = gql`
  mutation CreateProfil($input: CreateProfilInput!) {
    createProfil(input: $input) {
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
  }
`;

export const UPDATE_PROFIL = gql`
  mutation UpdateProfil($id: ID!, $input: UpdateProfilInput!) {
    updateProfil(id: $id, input: $input) {
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
  }
`;

export const DELETE_PROFIL = gql`
  mutation DeleteProfil($id: ID!) {
    deleteProfil(id: $id)
  }
`;

export const CREATE_PROJET = gql`
  mutation CreateProjet($input: CreateProjetInput!) {
    createProjet(input: $input) {
      id
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

export const UPDATE_PROJET = gql`
  mutation UpdateProjet($id: ID!, $input: UpdateProjetInput!) {
    updateProjet(id: $id, input: $input) {
      id
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

export const DELETE_PROJET = gql`
  mutation DeleteProjet($id: ID!) {
    deleteProjet(id: $id)
  }
`;

export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: CreateExperienceInput!) {
    createExperience(input: $input) {
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
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {
    updateExperience(id: $id, input: $input) {
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
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;

export const CREATE_COMPETENCE = gql`
  mutation CreateCompetence($input: CreateCompetenceInput!) {
    createCompetence(input: $input) {
      id
      name
      category
      level
      icon
      yearsOfExperience
      description
    }
  }
`;

export const UPDATE_COMPETENCE = gql`
  mutation UpdateCompetence($id: ID!, $input: UpdateCompetenceInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      name
      category
      level
      icon
      yearsOfExperience
      description
    }
  }
`;

export const DELETE_COMPETENCE = gql`
  mutation DeleteCompetence($id: ID!) {
    deleteCompetence(id: $id)
  }
`;

export const CREATE_EDUCATION = gql`
  mutation CreateEducation($input: CreateEducationInput!) {
    createEducation(input: $input) {
      id
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

export const UPDATE_EDUCATION = gql`
  mutation UpdateEducation($id: ID!, $input: UpdateEducationInput!) {
    updateEducation(id: $id, input: $input) {
      id
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

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: ID!) {
    deleteEducation(id: $id)
  }
`;
