package server

import com.azsolutions.job.ImageCrawlerJob
import com.azsolutions.job.ImageDetectSizeJob
import com.azsolutions.job.LowImageSizeNewsScanJob
import com.azsolutions.job.NewsContentCrawlerJob
import com.azsolutions.service.ImageUtilsService
import com.azsolutions.service.JsoupUtilsService
import com.azsolutions.service.background.LowImageSizeNewsScanService
import com.azsolutions.service.crawler.ImageCrawlerService
import com.azsolutions.service.crawler.ImageDetectSizeService
import com.azsolutions.service.crawler.NewsContentCrawlerService
import com.azsolutions.service.crawler.RssCrawlerService

class BootStrap {

    def rssConfigService;
    def rssSourceGroupService;
    def rssSourceService;
    def newsContentCrawlerConfigService;
    def grailsApplication;

    def init = { servletContext ->

        this.rssSourceGroupService.cacheRssSourceGroups();

        this.rssConfigService.cacheRssConfig();

        this.rssSourceService.cacheRssSources();

        this.newsContentCrawlerConfigService.cacheConfigs();

        this.initImageCrawlerConfigs();

        this.initImageDetectSizeConfigs();

        this.initLowImageSizeNewsScanConfigs();

        this.initNewsContentCrawlerConfigs();

        this.initRssCrawlerConfigs();
    }

    def destroy = {
    }

    private void initImageCrawlerConfigs() {

        def config = grailsApplication.config.imageCrawler;

        ImageCrawlerService.MAX_SCANNED_NEWS_LIST_SIZE = config.MAX_SCANNED_NEWS_LIST_SIZE;
        ImageCrawlerService.MAX_SCANNED_TIMES = config.MAX_SCANNED_TIMES;
        ImageCrawlerService.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES = config.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES;
        ImageCrawlerService.THREAD_POOL_SIZE = config.THREAD_POOL_SIZE;

        ImageCrawlerJob.DELAY_TIME_IN_MINUTES = config.job.DELAY_TIME_IN_MINUTES;
        ImageCrawlerJob.SCAN_RANGE_IN_MINUTES = config.job.SCAN_RANGE_IN_MINUTES;
    }

    private void initImageDetectSizeConfigs() {

        def config = grailsApplication.config.imageDetectSize;

        ImageDetectSizeJob.DELAY_TIME_IN_MINUTES = config.job.DELAY_TIME_IN_MINUTES;
        ImageDetectSizeJob.SCAN_RANGE_IN_MINUTES = config.job.SCAN_RANGE_IN_MINUTES;
        ImageDetectSizeJob.SCAN_RANGE_IN_MINUTES = config.job.MAX_SCANNED_TIMES;

        ImageDetectSizeService.MAX_SCANNED_NEWS_LIST_SIZE = config.MAX_SCANNED_NEWS_LIST_SIZE;
        ImageDetectSizeService.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES = config.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES;
        ImageDetectSizeService.THREAD_POOL_SIZE = config.THREAD_POOL_SIZE;

        ImageUtilsService.HTTP_CONNECT_TIMEOUT = config.HTTP_CONNECT_TIMEOUT;
        ImageUtilsService.HTTP_READ_TIMEOUT = config.HTTP_READ_TIMEOUT;
    }

    private void initLowImageSizeNewsScanConfigs() {

        def config = grailsApplication.config.lowImageSizeNewsScan;

        LowImageSizeNewsScanJob.DELAY_TIME_IN_MINUTES = config.DELAY_TIME_IN_MINUTES;
        LowImageSizeNewsScanJob.SCAN_RANGE_IN_MINUTES = config.SCAN_RANGE_IN_MINUTES;
        LowImageSizeNewsScanJob.MIN_SIZE = config.MIN_SIZE;
        LowImageSizeNewsScanService.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES = config.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES;
    }

    private void initNewsContentCrawlerConfigs() {

        def config = grailsApplication.config.newsContentCrawler;

        NewsContentCrawlerJob.DELAY_TIME_IN_MINUTES = config.job.DELAY_TIME_IN_MINUTES;
        NewsContentCrawlerJob.SCAN_RANGE_IN_MINUTES = config.job.SCAN_RANGE_IN_MINUTES;
        NewsContentCrawlerJob.MAX_SCANNED_TIMES = config.job.MAX_SCANNED_TIMES;

        NewsContentCrawlerService.MAX_SCANNED_NEWS_LIST_SIZE = config.MAX_SCANNED_NEWS_LIST_SIZE;
        NewsContentCrawlerService.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES = config.MAX_SCANNED_PERIOD_RANGE_IN_MINUTES;
        NewsContentCrawlerService.THREAD_POOL_SIZE = config.THREAD_POOL_SIZE;
    }

    private void initRssCrawlerConfigs() {

        def config = grailsApplication.config.rssCrawler;

        RssCrawlerService.READ_RSS_THREAD_POOL_SIZE = config.READ_RSS_THREAD_POOL_SIZE;
        JsoupUtilsService.HOT_NEWS_CRAWLER_TIMEOUT = config.HOT_NEWS_CRAWLER_TIMEOUT;
    }
}
