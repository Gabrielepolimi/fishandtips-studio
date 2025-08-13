export default function handler(req, res) {
  res.status(200).json({ 
    message: 'FishandTips Studio API',
    studio: 'https://fishandtips.sanity.studio',
    status: 'active',
    projectId: '3nnnl6gi',
    dataset: 'production'
  });
}