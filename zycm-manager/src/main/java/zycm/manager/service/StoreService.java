package zycm.manager.service;

import java.util.List;

import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StoreEntity;

public interface StoreService {

	int addStore(StoreEntity stroeEntity);

	List<StoreEntity> queryStoreList(PageEntity pageEntity);

	int queryStoreNum();

	int delStore(StoreEntity stroeEntity);

}
