import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectCreateInput!) {
    createProject(input: $input) {
      id
      title
      shortDescription
      longDescription
      imageUrl
      category
      technologies
      link
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: ProjectUpdateInput!) {
    updateProject(input: $input) {
      id
      title
      shortDescription
      longDescription
      imageUrl
      category
      technologies
      link
    }
  }
`;

export const GET_PROJECT = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      title
      shortDescription
      longDescription
      imageUrl
      category
      technologies
      link
    }
  }
`;
export const GET_PROJECTS = gql`
  query Projects {
    projects {
      id
      title
      shortDescription
      longDescription
      imageUrl
      category
      technologies
      link
    }
  }
`;
