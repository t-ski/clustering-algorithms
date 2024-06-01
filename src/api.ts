import { Distance } from "./util/Distance";

export const util = {
	Distance
};


// Algorithm API
export * from "./algorithms/centroid/KMeans";
export * from "./algorithms/centroid/KMedoids";

export * from "./algorithms/hierarchy/AverageLinkage";
export * from "./algorithms/hierarchy/CompleteLinkage";
export * from "./algorithms/hierarchy/SingleLinkage";