/* eslint-disable no-unused-vars */
import * as ApiTypes from "../types/apitypes";

type TransformDomainSegmentsToApiSegments = (
  appliedSegmentTitles: ApiTypes.Segment["title"][],
  segments: ApiTypes.Segment[]
) => { id: ApiTypes.Segment["id"] }[];

const transformDomainSegmentsToApiSegments: TransformDomainSegmentsToApiSegments =
  (appliedSegmentNames, segments) =>
    appliedSegmentNames.flatMap(title => {
      const selectedSegment = segments.find(segment => segment.title === title);

      if (selectedSegment === undefined) {
        return [];
      }

      return { id: selectedSegment.id };
    });

export { transformDomainSegmentsToApiSegments };
