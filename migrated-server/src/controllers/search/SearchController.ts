import { Request, Response } from 'express'
import SearchService from '@services/search/SearchService'

class SearchController {
    public static async search(req: Request, res: Response) {
        const { query } = req.params; 
        
        const results = await SearchService.search(query); 
        
        res.status(200).json({
            results: results 
        });
    }
}

export default SearchController;