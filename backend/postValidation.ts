import { BlogPost } from "./interfaces"
import validator from "validator";

/**
 * Function which takes in a post, validates data and
 * returns an error message if something is incorrect.
 * 
 * @param post 
 * @returns (null | string)
 */
const validateBlogPost = (post: BlogPost): string | null => {
    if (!validateTitle(post.title)) {
        return 'Error validating title'
    }

    if (!validateAuthor(post.author)) {
        return 'Error validating author'
    }

    if (!validateContent(post.content)) {
        return 'Error validating content'
    }

    return null;
}

const validateTitle = (title: string): boolean => {
    title = validator.trim(title);

    if (validator.isEmpty(title)) {
        return false;
    }

    if (title.length > 50) {
        return false;
    }

    return true;
}

const validateAuthor = (author: string): boolean => {
    author = validator.trim(author);

    if (validator.isEmpty(author)) {
        return false;
    }

    if (author.length > 50) {
        return false;
    }

    return true;
}

const validateContent = (content: string): boolean => {
    content = validator.trim(content);
    
    if (validator.isEmpty(content)) {
        return false;
    }

    if (content.length > 500) {
        return false;
    }

    return true;
}

const validateDatePublished = (datePublished: string): boolean => {
    if (validator.isDate(datePublished)) {
        return false
    }

    return true;
}

const containsSpecialChars = (str: string): boolean => {
    const specialCharRegex = /[@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]+/; 
    return specialCharRegex.test(str);
}