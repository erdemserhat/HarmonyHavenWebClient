import axios from './axios'


export type EnneagramQuestionDto = {
    id: string;
    personalityNumber: number;
    content: string;
};

export type EnneagramAnswerDto = {
    questionId: string;
    score: number;
};

export type EnneagramScore = {
    type: number;       // Int
    score: number;      // Int
};

export type EnneagramWingTypes = {
    pointBasedWingType: number;
    enneagramBasedWingType: number;
};

export type EnneagramFamousPeopleDto = {
    name: string;
    imageUrl: string;
    desc: string;
};

export type EnneagramUrl = {
    chartUrl: string;
    personalityImageUrl: string;
};

export type EnneagramTestResult = {
    typeScores: EnneagramScore[];
    dominantType: EnneagramScore;
    wingType: EnneagramWingTypes;
};

export type EnneagramTestResultDetailedDto = {
    result: EnneagramTestResult;
    description: string;
    fullDescriptionCode: number;
    famousPeople: EnneagramFamousPeopleDto[];
    chartUrl: EnneagramUrl | null; // nullable
};

export type CheckingTestResultDto = {
    detailedResult: EnneagramTestResultDetailedDto | null;
    isTestTakenBefore: boolean;
};

export const enneagramService = {
    getQuestions: async (): Promise<EnneagramQuestionDto[]> => {
        const response = await axios.get('/enneagram/questions');
        return response.data;
    },

    sendQuestion: async (answers: EnneagramAnswerDto[]): Promise<EnneagramTestResultDetailedDto> => {
        const response = await axios.post('/enneagram/answers', answers);
        return response.data;
    },

    checkTestResult: async (): Promise<CheckingTestResultDto> => {
        const response = await axios.get('/enneagram/check-test-status');
        return response.data;
    }


}



