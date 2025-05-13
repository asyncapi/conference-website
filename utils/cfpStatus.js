export function checkCFPStatus(conferences) {
  const today = new Date();
  
  return conferences.map(conference => {
    if (conference.cfpdate) {
      const cfpDateStr = conference.cfpdate.replace(/(\d+)(st|nd|rd|th)/, '$1');
      const cfpDate = new Date(cfpDateStr);
      
      if (cfpDate < today) {
        return {
          ...conference,
          cfp: false
        };
      }
    }
    return conference;
  });
} 